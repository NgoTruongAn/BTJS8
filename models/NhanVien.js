function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam,
  _xepLoai
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.xepLoai = _xepLoai;

  this.tinhLuong = function () {
    var tongLuong = 0;
    if (this.chucVu == "Giám đốc")
      return (tongLuong = Number(this.luongCoBan) * 3).toFixed(1);
    else if (this.chucVu == "Trưởng phòng")
      return (tongLuong = Number(this.luongCoBan) * 2).toFixed(1);
    else return (tongLuong = Number(this.luongCoBan)).toFixed(1);
  };

  this.xepLoai = function () {
    var xepLoai = "";
    if (this.gioLam >= 192) return (xepLoai = "Xuất sắc");
    else if (this.gioLam >= 176) return (xepLoai = "Giỏi");
    else if (this.gioLam >= 160) return (xepLoai = "Khá");
    else return xepLoai = "Trung bình";
  };
}
