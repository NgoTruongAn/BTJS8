function DSNV() {
    this.nhanviens = [];
    this._themNhanVien = function (nv) {
      this.nhanviens.push(nv);
    };
  
    this._timViTriNhanVien = function (taiKhoan) {
      
      var index = -1;
  
      for (var i = 0; i < this.nhanviens.length; i++) {
        var nv = this.nhanviens[i]; 
        if (nv.taiKhoan === taiKhoan) {
          index = i;
          break;
        }
      }
  
      return index;
    };
  
    this._layThongTinNhanVien = function (taiKhoan) {
      var index = this._timViTriNhanVien(taiKhoan);
      if (index !== -1) {
        var nv = this.nhanviens[index];
        return nv;
      }
    };
  
    this._capNhatNhanVien = function (nhanVien) {
      var index = this._timViTriNhanVien(nhanVien.maSV);
      console.log("index: ", index);
      if (index !== -1) {
        this.nhanviens[index] = nhanVien;
      }
    };
  
    this._xoaNhanVien = function (taiKhoan) {
      var index = this._timViTriNhanVien(taiKhoan);
      if (index !== -1) {
        this.nhanviens.splice(index, 1);
      }
    };
  }