import { Attribute } from "./attribute.js";
import { SchoolClass } from "./schoolClass.js";
import { Student } from "./student.js";

let arrClasses = [['Prima','13'],['Seconda','14'],['Terza','15'],['Quarta','16'],['Quinta','17'],]
let mapClasses = new Map()
for (const selectedCLass of arrClasses) {
    mapClasses.set(mapClasses.size,new SchoolClass(...selectedCLass)) 
    $("#classes").append(`<article id=${mapClasses.size}> <div> Classe ${selectedCLass[0]} </div></article>`);
}


function createStudent() {
    const student = new Student();
    for (const attribute in student.attributes) {
        let attr 
        do {
            attr = prompt(`Give me ${attribute}`)
            switch (student.attributes[attribute].type) {
                case 'string':
                    attr = String(attr)
                    break;
                case 'number':
                    attr = Number(attr)
                    break;
                case 'date':
                    attr = new Date(attr)
                    if (attr == 'Invalid Date') attr = ''
            }
        } while (!attr);
        student[attribute] = attr
    }
    let selectedCLass
    do {
        selectedCLass = prompt(`Give me a class`)
    } while (!selectedCLass);
    return [student,selectedCLass]
}

function renderClass(studentParams) { //QUESTO VA SISTEMATO PER IL NUOVO FE
    $(`#${studentParams[1]}`).append(`
    <div id=${studentParams[0].id} class="student">
        Name: ${studentParams[0].name} ,
        Surname: ${studentParams[0].surname} ,
        Birthday: ${studentParams[0].birthday.toISOString()} 
    </div>`);
}

function editStudent(e) {
    let idStudent = e.target.id //id dello studente dove ho appena cliccato 
    var idParent = e.target.parentElement.id; //id della classe padre (la ClassRoom dello studente)
    let isStudent = mapClasses.get(Number(idParent)).studentClass.find(elem => elem.id == idStudent)
    console.log(isStudent)
}

$(document).ready(function(){
    $('#add').click(function() {
        let student = createStudent()
        mapClasses.get(Number(student[1])).studentClass.push(student[0])
        renderClass(student)
        console.log(mapClasses)
    })

    $(document).on('click', '.student', e=> editStudent(e))
});

