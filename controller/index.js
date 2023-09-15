var dsnv = new DSNV();

// lấy dữ liệu từ localStorage lúc user load trang
var dataJson = localStorage.getItem("DSNV");
console.log("dataJson: ", dataJson);
if (dataJson !== null) {
  dsnv.nhanviens = JSON.parse(dataJson).map(function (item) {
    return new NhanVien(
      item.taiKhoan,
      item.hoTen,
      item.email,
      item.matKhau,
      item.ngayLam,
      item.luongCoBan,
      item.chucVu,
      item.gioLam,
      item.xepLoai
    );
  });

  renderTable(dsnv.nhanviens);
}

function getElm(selector) {
  return document.querySelector(selector);
}

function renderTable(listArr) {
  var htmlString = "";
  for (var i = 0; i < listArr.length; i++) {
    var nhanVien = listArr[i];
    htmlString += `
    <tr>
      <td>${nhanVien.taiKhoan}</td>
      <td>${nhanVien.hoTen}</td>
      <td>${nhanVien.email}</td>
      <td>${nhanVien.ngayLam}</td>
      <td>${nhanVien.chucVu}</td>
      <td>${nhanVien.tinhLuong()}</td>
      <td>${nhanVien.xepLoai()}</td>
      <td>
        <button class="btn btn-warning" data-toggle="modal"
        data-target="#myModal" onclick="suaNV('${nhanVien.taiKhoan}'), offValid()">Sửa</button>
        <button class="btn btn-danger" onclick="xoaNV('${nhanVien.taiKhoan}')">Xóa</button>
      </td>
    </tr>`;
  }

  getElm("#tableDanhSach").innerHTML = htmlString;
}

function resetForm() {
  getElm("#tknv").value = "";
  getElm("#tknv").disabled = false;
  getElm("#name").value = "";
  getElm("#email").value = "";
  getElm("#password").value = "";
  getElm("#datepicker").value = "";
  getElm("#luongCB").value = "";
  getElm("#chucvu").value = "";
  getElm("#gioLam").value = "";
}
function offValid() {
    getElm("#tbTKNV").style.display = "none";
    getElm("#tbTen").style.display = "none";
    getElm("#tbEmail").style.display = "none";
    getElm("#tbMatKhau").style.display = "none";
    getElm("#tbNgay").style.display = "none";
    getElm("#tbLuongCB").style.display = "none";
    getElm("#tbChucVu").style.display = "none";
    getElm("#tbGiolam").style.display = "none";
}
function layThongTinTuForm() {
  var taiKhoan = getElm("#tknv").value;
  var hoTen = getElm("#name").value;
  var email = getElm("#email").value;
  var matKhau = getElm("#password").value;
  var ngayLam = getElm("#datepicker").value;
  var luongCoBan = +getElm("#luongCB").value;
  var chucVu = getElm("#chucvu").value;
  var gioLam = +getElm("#gioLam").value;

  return new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
}

function themNV() {
  var nv = layThongTinTuForm();
  console.log("nv: ", nv);

  var valid =
    kiemTraRong(nv.taiKhoan, "#tbTKNV", "Tài khoản không được để trống !") &&
    kiemTraTrung(
      nv.taiKhoan,
      dsnv.nhanviens,
      "#tbTKNV",
      "Tài khoản đã tồn tại"
    ) &&
    kiemTraDoDai(nv.taiKhoan, 4, 6, "#tbTKNV", "Tài khoản phải từ 4~6 ký tự !");

  // kiểm tra tên
  valid &=
    kiemTraRong(nv.hoTen, "#tbTen", "Tên nhân viên không được để trống !") &&
    kiemTraChuoi(nv.hoTen, "#tbTen", "Tên nhân viên phải là chữ !");

  // kiểm tra định dạng email
  valid &=
    kiemTraRong(nv.email, "#tbEmail", "Email không được để trống !") &&
    kiemTraEmail(nv.email, "#tbEmail", "Email không đúng định dạng !");

  // kiểm tra mật khẩu
  valid &=
    kiemTraRong(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống !") &&
    kiemTraMatKhau(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu phải có 6 đến 10 ký tự, trong đó có ít nhất một chữ thường, một chữ hoa, một chữ số và một ký tự đặc biệt"
    );

  //kiểm tra ngày làm
  valid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống !");

  //kiểm tra lương
  valid &=
    kiemTraSoRong(nv.luongCoBan, "#tbLuongCB", "Lương không được để trống !") &&
    kiemTraSoGH(
      nv.luongCoBan,
      1000000,
      20000000,
      "#tbLuongCB",
      "Lương nhập từ 1000000 - 20000000!"
    );

  //kiểm tra chức vụ
  valid &= kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống !") &&
   kiemTraOption(nv.chucVu, "#tbChucVu", "Vui lòng chọn 1 chức vụ");

  // kiểm tra giờ
  valid &=
    kiemTraSoRong(nv.gioLam, "#tbGiolam", "Giờ không được để trống !") &&
    kiemTraSoGH(nv.gioLam, 80, 200, "#tbGiolam", "Giờ nhập từ 80 - 200!");
  if (valid) {
    dsnv._themNhanVien(nv);
    console.log("dsnv", dsnv.nhanviens);

    var data = JSON.stringify(dsnv.nhanviens);
    console.log("data: ", data);

    localStorage.setItem("DSNV", data);

    resetForm();
    renderTable(dsnv.nhanviens);
  }
}

function xoaNV(taiKhoan) {
  dsnv._xoaNhanVien(taiKhoan);
  localStorage.removeItem("DSNV", taiKhoan);
  renderTable(dsnv.nhanviens);
}

function suaNV(taiKhoan) {
  var nv = dsnv._layThongTinNhanVien(taiKhoan);
  if (nv) {
    getElm("#tknv").value = nv.taiKhoan;
    getElm("#tknv").disabled = true;
    getElm("#name").value = nv.hoTen;
    getElm("#email").value = nv.email;
    getElm("#password").value = nv.matKhau;
    getElm("#datepicker").value = nv.ngayLam;
    getElm("#luongCB").value = nv.luongCoBan;
    getElm("#chucvu").value = nv.chucVu;
    getElm("#gioLam").value = nv.gioLam;
  }
}

function capNhatNhanVien() {
  var nv = layThongTinTuForm();

  dsnv._capNhatNhanVien(nv);
  resetForm();
  renderTable(dsnv.nhanviens);

}

//tìm kiếm
document.querySelector("#btnTimNV").onclick = function () {
  var textSearch = document
    .querySelector("#searchName")
    .value.trim()
    ?.toLowerCase();
  var result = [];

  if (textSearch.length > 0) {
    result = dsnv.nhanviens.filter(function (nv) {
      return nv.xepLoai.toLowerCase().includes(textSearch);
    });

    renderTable(result);
  } else {
    renderTable(dsnv.nhanviens);
  }
};
