import { Attribute } from "./attribute.js";
import { SchoolClass } from "./schoolClass.js";
import { Student } from "./student.js";
import { School } from "./school.js";

let arrClasses = [
  ["Prima", "13"],
  ["Seconda", "14"],
  ["Terza", "15"],
  ["Quarta", "16"],
  ["Quinta", "17"],
];
let school = new School("Scuola generale");
let i = 0;
let classRoomIds = [];
for (const selectedCLass of arrClasses) {
  let newClassRoom = new SchoolClass(...selectedCLass);
  $("#classes").append(
    `<article><h3>${selectedCLass[0]}</h3><ul id=${i}></ul></article>`
  );
  classRoomIds.push(newClassRoom.id);
  school.addSchoolClass(newClassRoom);
  i++;
}

function createStudent() {
  const student = new Student(
    $("#input-name").val(),
    $("#input-surname").val(),
    $("#input-birthday").val()
  );

  let validation = student.validate();

  if (!validation.success) {
    throw err; //alert
  }

  school.addStudent(student);

  switch ($("#input-class").val()) {
    case "1":
      school.addStudentToSchoolClass(student.id, classRoomIds[0]);
      break;
    case "2":
      school.addStudentToSchoolClass(student.id, classRoomIds[1]);
      break;
    case "3":
      school.addStudentToSchoolClass(student.id, classRoomIds[2]);
      break;
    case "4":
      school.addStudentToSchoolClass(student.id, classRoomIds[3]);
      break;
    case "5":
      school.addStudentToSchoolClass(student.id, classRoomIds[4]);
      break;
    default:
      throw err; //alert
  }
}

function renderClass(selClass) {
  let entriesClasses = Array.from(school.classes.keys());
  let id = entriesClasses[selClass - 1];
  let currentClass = [...school.classes.values()].find(
    (elem) => elem.class.id == id
  );
  if ($(`#${selClass - 1}`)[0].childElementCount > 0) {
    $(`#${selClass - 1}`).empty();
  }
  for (const student of currentClass.students.values()) {
    $(`#${selClass - 1}`).append(`
    <li id=${student.id} class="student" data-bs-toggle="modal" data-bs-target="#exampleModal2"> ${student.name} ${student.surname}
        <div> ${student.birthday} </div> 
    </li>`);
  }
}

function editStudent(e) {
  let idStudent = e.target.id; //id dello studente dove ho appena cliccato

  let nameStudent = e.target.textContent;

  let modal = $("#exampleModal");

  $("#exampleModalLabel2")[0].innerText = nameStudent;

  let idClass = e.target.parentElement.id;

  debugger;
  $("#form-student-edit").submit(function (event) {
    event.preventDefault();
    modal.modal( "hide" );
    let editNameInput = $("#edit-name").val();
    let editSurnameInput = $("#edit-surname").val();
    let editBirthdayInput = $("#edit-birthday").val();
    console.log(idClass);
    // modal.find("input").val('').end(); DA AGGIUNGERE
  });
}

$(document).ready(function () {
    let modal = $("#exampleModal");
    $("#form-student").submit(function (event) {
        event.preventDefault();
        modal.modal( "hide" );
        createStudent();
        let selClass = $("#input-class").val();
        renderClass(selClass);
        modal.find("input").val('').end();
    });
    $(document).on("click", ".student", (e) => editStudent(e));
});

function error1(error) {
    $('#error-message').css('display', 'block');
    $('error-text').text = error;
} 
function error2(error) {
    $('#error-message2').css('display', 'block');
    $('error-text2').text = error;
} 

$('#close-error').click(function () {
    $('#error-message').css('display', 'none');
});

$('#close-error2').click(function () {
    $('#error-message2').css('display', 'none');
});