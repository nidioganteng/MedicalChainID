import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";
import Option "mo:base/Option";
import Array "mo:base/Array";

actor RekamMedisSystem {

  public type RekamMedisId = Nat32;

  public type RekamMedis = {
    nama : Text;
    umur : Nat32;
    tanggal_lahir : Text;
    jenis_kelamin : Text;
    alamat : Text;

    tanggal_periksa : Text;
    keluhan : Text;
    diagnosa : Text;
    tindakan : Text;
    resep_obat : Text;

    dokter : Text; 
    rumah_sakit : Text;
    is_active : Bool;
  };

  private stable var id : RekamMedisId = 0;
  private stable var rekamMedisMap : Trie.Trie<RekamMedisId, RekamMedis> = Trie.empty();

  private func key(x: RekamMedisId) : Trie.Key<RekamMedisId> {
    { hash = x; key = x };
  };

  // CREATE
  public func createRekamMedis(data: RekamMedis) : async RekamMedisId {
    let currentId = id;
    id += 1;

    // Paksa aktif saat buat (soft-delete fitur terpisah)
    let dataAktif : RekamMedis = {
      nama = data.nama;
      umur = data.umur;
      tanggal_lahir = data.tanggal_lahir;
      jenis_kelamin = data.jenis_kelamin;
      alamat = data.alamat;
      tanggal_periksa = data.tanggal_periksa;
      keluhan = data.keluhan;
      diagnosa = data.diagnosa;
      tindakan = data.tindakan;
      resep_obat = data.resep_obat;
      dokter = data.dokter;
      rumah_sakit = data.rumah_sakit;
      is_active = true;
    };

    rekamMedisMap := Trie.replace(
      rekamMedisMap,
      key(currentId),
      Nat32.equal,
      ?dataAktif
    ).0;

    currentId
  };

  // READ ONE
  public query func getRekamMedis(id: RekamMedisId) : async ?RekamMedis {
    Trie.find(rekamMedisMap, key(id), Nat32.equal)
  };

  // READ ALL
  public query func getAllRekamMedis() : async [(RekamMedisId, RekamMedis)] {
    Iter.toArray(Trie.iter(rekamMedisMap))
  };

  // READ ONLY ACTIVE
  public query func getAktifRekamMedis() : async [(RekamMedisId, RekamMedis)] {
    let all = Iter.toArray(Trie.iter(rekamMedisMap));
    Array.filter<(RekamMedisId, RekamMedis)>(
      all,
      func ((_, data)) { data.is_active }
    )
  };

  // UPDATE (edit data) – mempertahankan is_active lama
  public func updateRekamMedis(id: RekamMedisId, input: RekamMedis) : async Bool {
    switch (Trie.find(rekamMedisMap, key(id), Nat32.equal)) {
      case (?old) {
        let updated : RekamMedis = {
          nama = input.nama;
          umur = input.umur;
          tanggal_lahir = input.tanggal_lahir;
          jenis_kelamin = input.jenis_kelamin;
          alamat = input.alamat;
          tanggal_periksa = input.tanggal_periksa;
          keluhan = input.keluhan;
          diagnosa = input.diagnosa;
          tindakan = input.tindakan;
          resep_obat = input.resep_obat;
          dokter = input.dokter;
          rumah_sakit = input.rumah_sakit;
          is_active = old.is_active; // pertahankan status
        };
        rekamMedisMap := Trie.replace(rekamMedisMap, key(id), Nat32.equal, ?updated).0;
        true
      };
      case null { false };
    }
  };

  // HIDE (soft delete)
  public func hideRekamMedis(id: RekamMedisId) : async Bool {
    switch (Trie.find(rekamMedisMap, key(id), Nat32.equal)) {
      case (?old) {
        let updated : RekamMedis = {
          nama = old.nama;
          umur = old.umur;
          tanggal_lahir = old.tanggal_lahir;
          jenis_kelamin = old.jenis_kelamin;
          alamat = old.alamat;
          tanggal_periksa = old.tanggal_periksa;
          keluhan = old.keluhan;
          diagnosa = old.diagnosa;
          tindakan = old.tindakan;
          resep_obat = old.resep_obat;
          dokter = old.dokter;
          rumah_sakit = old.rumah_sakit;
          is_active = false;
        };
        rekamMedisMap := Trie.replace(rekamMedisMap, key(id), Nat32.equal, ?updated).0;
        true
      };
      case null { false };
    }
  };

  // RESTORE
  public func restoreRekamMedis(id: RekamMedisId) : async Bool {
    switch (Trie.find(rekamMedisMap, key(id), Nat32.equal)) {
      case (?old) {
        let updated : RekamMedis = {
          nama = old.nama;
          umur = old.umur;
          tanggal_lahir = old.tanggal_lahir;
          jenis_kelamin = old.jenis_kelamin;
          alamat = old.alamat;
          tanggal_periksa = old.tanggal_periksa;
          keluhan = old.keluhan;
          diagnosa = old.diagnosa;
          tindakan = old.tindakan;
          resep_obat = old.resep_obat;
          dokter = old.dokter;
          rumah_sakit = old.rumah_sakit;
          is_active = true;
        };
        rekamMedisMap := Trie.replace(rekamMedisMap, key(id), Nat32.equal, ?updated).0;
        true
      };
      case null { false };
    }
  };

  // TOGGLE ACTIVE (opsional – memudahkan di frontend)
  public func toggleActive(id: RekamMedisId) : async ?Bool {
    switch (Trie.find(rekamMedisMap, key(id), Nat32.equal)) {
      case (?old) {
        let newVal = not old.is_active;
        let updated : RekamMedis = {
          nama = old.nama;
          umur = old.umur;
          tanggal_lahir = old.tanggal_lahir;
          jenis_kelamin = old.jenis_kelamin;
          alamat = old.alamat;
          tanggal_periksa = old.tanggal_periksa;
          keluhan = old.keluhan;
          diagnosa = old.diagnosa;
          tindakan = old.tindakan;
          resep_obat = old.resep_obat;
          dokter = old.dokter;
          rumah_sakit = old.rumah_sakit;
          is_active = newVal;
        };
        rekamMedisMap := Trie.replace(rekamMedisMap, key(id), Nat32.equal, ?updated).0;
        ?newVal
      };
      case null { null };
    }
  };
};
