import { Attribute } from "./attribute.js";
import { SchoolClass } from "./schoolClass.js";
import { Student } from "./student.js";
import { School } from "./school.js";

let arrClasses = [ 
    ["Class 1", "13"],
    ["Class 2", "14"],
    ["Class 3", "15"],
    ["Class 4", "16"],
    ["Class 5", "17"],
];
let school = new School("Scuola generale");
let i = 0;
let classRoomIds = []; //Array per avere gli id di ogni classe che sono diversi ad ogni refresh di pagina
for (const selectedCLass of arrClasses) { //Ciclo per creare le classi e aggiungerle alla classescuola
    let newClassRoom = new SchoolClass(...selectedCLass);
    $("#classes").append(
        `<article><h3>${selectedCLass[0]}</h3><ul id=${i}></ul></article>`  
    );
    classRoomIds.push(newClassRoom.id);
    school.addSchoolClass(newClassRoom);
    i++;
}

function createStudent() {
    const student = new Student( //dichiarazione di un nuovo studente
        $("#input-name").val(),
        $("#input-surname").val(),
        $("#input-birthday").val()
    );

    let validation = student.validate(); //Validazione dello studente

    if (!validation.success) {
        throw error1('Assicurati di aver inserito correttamente i dati'); //alert va fatto qualcosa graficamente
    }

    school.addStudent(student); //aggiunta di studente alla scuola

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
            throw error1('Assicurati di aver inserito un campo valido per la classe');  //alert
    }
}

function renderClass(selClass) {                            // rendering di classe
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

function editStudent(elementStudent) {      //edit di student

    let idStudent = elementStudent.currentTarget.id; //id dello studente dove ho appena cliccato
    let positionIdClass = elementStudent.target.parentElement.parentElement.id; //questo è l'id della classe

    let editNameInput = $("#edit-name").val();
    let editSurnameInput = $("#edit-surname").val();
    let editBirthdayInput = $("#edit-birthday").val();
    let newClassHTMLId = $("#edit-class").val();

    let newStudent = new Student(editNameInput, editSurnameInput, editBirthdayInput);
    newStudent.validate();
     
    school.removeStudent(idStudent);   //rimuove lo studente editato da scuola
    if(positionIdClass !== newClassHTMLId - 1){
        renderClass(parseInt(positionIdClass) + 1);
    }

    school.addStudent(newStudent);  //ne crea uno nuovo seguendo i nuovi dati del form
    school.addStudentToSchoolClass(newStudent.id, classRoomIds[newClassHTMLId - 1]);
    renderClass($("#edit-class").val());  

}

$(document).ready(function () {

    let modal = $("#exampleModal");
    let modal2 = $("#exampleModal2"); 

    $("#form-student").submit(function (event) {  //form di createStudent()
        event.preventDefault();
        modal.modal( "hide" );
        createStudent();
        let selClass = $("#input-class").val();
        renderClass(selClass);
        modal.find("input").val('').end();
    });
    let idClickedStudent;

    $(document).on("click", ".student", (e) => (idClickedStudent = e));
    $("#form-student-edit").submit((e) => editStudent(idClickedStudent));

    $("#form-student-edit").submit(function (event) {  //form di editStudent()
        event.preventDefault();
        modal2.modal( "hide" );
        let editNameInput = $("#edit-name").val();
        let editSurnameInput = $("#edit-surname").val();
        let editBirthdayInput = $("#edit-birthday").val();
        modal2.find("input").val('').end();
    });
})


// funzioni di FrontEnd
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