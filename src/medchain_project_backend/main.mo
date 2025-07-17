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
    is_active : Bool;
  };

  private stable var id : RekamMedisId = 0;
  private stable var rekamMedisMap : Trie.Trie<RekamMedisId, RekamMedis> = Trie.empty();

  public func createRekamMedis(data: RekamMedis) : async RekamMedisId {
    let currentId = id;
    id += 1;

    let dataAktif = {
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
      is_active = true;
    };

    rekamMedisMap := Trie.replace(
      rekamMedisMap,
      key(currentId),
      Nat32.equal,
      ?dataAktif
    ).0;

    return currentId;
  };


  public query func getRekamMedis(id: RekamMedisId) : async ?RekamMedis {
    let result = Trie.find(rekamMedisMap, key(id), Nat32.equal);
    return result;
  };

  
  public query func getAllRekamMedis() : async [(RekamMedisId, RekamMedis)] {
    
    let resultAllData = Iter.toArray(Trie.iter(rekamMedisMap));
    return resultAllData
  };

public func updateRekamMedis(id: RekamMedisId, input: RekamMedis) : async Bool {
  let existing = Trie.find(rekamMedisMap, key(id), Nat32.equal);
  let found = Option.isSome(existing);

  if (found) {
    rekamMedisMap := Trie.replace(
      rekamMedisMap,
      key(id),
      Nat32.equal,
      ?input
    ).0;
  };

  return found;
};

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
        is_active = false; // Ditandai tidak aktif (soft delete)
      };

      rekamMedisMap := Trie.replace(
        rekamMedisMap,
        key(id),
        Nat32.equal,
        ?updated
      ).0;

      return true;
    };
    case null {
      return false;
    };
  };
};


public query func getAktifRekamMedis() : async [(RekamMedisId, RekamMedis)] {
  let all = Iter.toArray(Trie.iter(rekamMedisMap));
  let aktif = Array.filter<(RekamMedisId, RekamMedis)>(
    all,
    func((_, data)) { data.is_active }
  );
  return aktif;
};


public func restoreRekamMedis(id: RekamMedisId) : async Bool {
  switch (Trie.find(rekamMedisMap, key(id), Nat32.equal)) {
    case (?old) {
      let restored : RekamMedis = {
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
        is_active = true; 
      };

      rekamMedisMap := Trie.replace(
        rekamMedisMap,
        key(id),
        Nat32.equal,
        ?restored
      ).0;

      return true;
    };
    case null {
      return false;
    };
  };
};


  private func key(x: RekamMedisId) : Trie.Key<RekamMedisId> {
    return { hash = x; key = x };
  };
};
