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
for (const selectedCLass of arrClasses) {
  let newSchool = new SchoolClass(...selectedCLass);
  $("#classes").append(
    `<article><h3>${selectedCLass[0]}</h3><ul id=${mapClasses.size}></ul></article>`
  ); //NON SO SE SERVE
  school.addSchoolClass(newSchool);
  i++;
}

debugger;

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

  switch ($("#input-class").val()) {
    case "1":
      break;
    case "2":
      break;
    case "3":
      break;
    case "4":
      break;
    case "5":
      break;
    default:
      throw err; //alert
  }
}

function renderClass(studentParams) {
  //QUESTO VA SISTEMATO PER IL NUOVO FE
  $(`#${studentParams[1]}`).append(`
    <li id=${studentParams[0].id} class="student"> ${studentParams[0].name} ${studentParams[0].surname}
        <div> ${studentParams[0].birthday.toISOString()} </div> 
    </li>`);
}

function editStudent(e) {
  let idStudent = e.target.id; //id dello studente dove ho appena cliccato
  var idParent = e.target.parentElement.id; //id della classe padre (la ClassRoom dello studente)
  let isStudent = mapClasses
    .get(Number(idParent))
    .studentClass.find((elem) => elem.id == idStudent);
  console.log(isStudent);
}

$(document).ready(function () {
  $("#form-student").submit(function (event) {
    event.preventDefault();
    let student = createStudent();
    mapClasses.get(Number(student[1])).studentClass.push(student[0]);
    renderClass(student);
    console.log(mapClasses);
  });

  $(document).on("click", ".student", (e) => editStudent(e));
});
