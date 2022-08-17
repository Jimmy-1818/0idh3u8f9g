
/****Run everything on every change in one of the input through autentica_cacl()**/

document.getElementById("tip_monthly").addEventListener("change", on_focus);
document.getElementById("tip1").addEventListener("change", on_focus);
document.getElementById("tip2").addEventListener("change", on_focus);
document.getElementById("tip3").addEventListener("change", on_focus);
document.getElementById("tip4").addEventListener("change", on_focus);
document.getElementById("tip5").addEventListener("change", on_focus);

document.getElementById("tip_monthly").addEventListener("focus", on_focus);
document.getElementById("tip1").addEventListener("focus", on_focus);
document.getElementById("tip2").addEventListener("focus", on_focus);
document.getElementById("tip3").addEventListener("focus", on_focus);
document.getElementById("tip4").addEventListener("focus", on_focus);
document.getElementById("tip5").addEventListener("focus", on_focus);


var monthly = 0

var s1 = 0
var s2 = 0
var s3 = 0
var s4 = 0
var s5 = 0


var l1_a = 0
var l2_a = 0
var l3_a = 0
var l4_a = 0
var l5_a = 0
var result_a = 0


var l1_r = 0
var l2_r = 0
var l3_r = 0
var l4_r = 0
var l5_r = 0
var result_r = 0

function number_strip(number){
    number=number.replaceAll('.', '');
    return number
}

function format_user(number){
    return Number(number).toLocaleString("es-ES", {minimumFractionDigits: 0});
}


function format_prize(number){
    return new Intl.NumberFormat("de-DE", { style: "currency", "currency":"EUR" }).format(number);
}

/***
function reconstruct_branch(){
    var input_s = document.getElementsByClassName("input")
    var higher_not_0 = 0
    for (let i = 0; i < input_s.length; i++){
        if (document.getElementsByClassName("input")[i].value > 0){
            higher_not_0 = i 
        }
    }
    for (let i = 0; i <= higher_not_0; i++){
        if (document.getElementsByClassName("input")[i].value == 0){
            document.getElementsByClassName("input")[i].value = 1
        }
    }
}
****/

function vars_def(){
    monthly = document.getElementById("tip_monthly").value



    s1 = number_strip(document.getElementById("tip1").value)
    s2 = number_strip(document.getElementById("tip2").value)
    s3 = number_strip(document.getElementById("tip3").value)
    s4 = number_strip(document.getElementById("tip4").value)
    s5 = number_strip(document.getElementById("tip5").value)

    l1_a = (s1*10)
    l2_a = (s2*0.5) 
    l3_a = (s3*1)
    l4_a = (s4*1.5)
    l5_a = (s5*2)
    result_a = l1_a + l2_a + l3_a + l4_a + l5_a

    l1_r = (s1*(monthly/50))
    l2_r = (s2*(monthly/100))
    l3_r = (s3*(monthly/100))
    l4_r = (s4*(monthly/100))
    l5_r = (s5*(monthly/50))
    result_r = l1_r + l2_r + l3_r + l4_r + l5_r
}


function slider_value_update(){
    /** + monthly tab**/
    var monthly_s = document.getElementsByClassName("monthly") 
    for (var i = 0; i < monthly_s.length; i++){
        document.getElementsByClassName("monthly")[i].innerHTML = monthly + " €"
    }
}

function tab_value_update(){

    document.getElementById("tab1_u1").innerHTML = format_user(s1)
    document.getElementById("tab2_u1").innerHTML = format_user(s1)

    document.getElementById("tab1_u2").innerHTML = format_user(s2)
    document.getElementById("tab2_u2").innerHTML = format_user(s2)

    document.getElementById("tab1_u3").innerHTML = format_user(s3)
    document.getElementById("tab2_u3").innerHTML = format_user(s3)

    document.getElementById("tab1_u4").innerHTML = format_user(s4)
    document.getElementById("tab2_u4").innerHTML = format_user(s4)

    document.getElementById("tab1_u5").innerHTML = format_user(s5)
    document.getElementById("tab2_u5").innerHTML = format_user(s5)

/**bottom line**/
    var tot_utenti = Number(s1) + Number(s2) + Number(s3) + Number(s4) + Number(s5)
    document.getElementById("tab1_u12345").innerHTML = format_user(tot_utenti)
    document.getElementById("tab2_u12345").innerHTML = format_user(tot_utenti)

/**last column**/
    document.getElementById("tab1_p1").innerHTML = format_prize(l1_a)
    document.getElementById("tab2_p1").innerHTML = format_prize(l1_r)

    document.getElementById("tab1_p2").innerHTML = format_prize(l2_a)
    document.getElementById("tab2_p2").innerHTML = format_prize(l2_r)

    document.getElementById("tab1_p3").innerHTML = format_prize(l3_a)
    document.getElementById("tab2_p3").innerHTML = format_prize(l3_r)

    document.getElementById("tab1_p4").innerHTML = format_prize(l4_a)
    document.getElementById("tab2_p4").innerHTML = format_prize(l4_r)

    document.getElementById("tab1_p5").innerHTML = format_prize(l5_a)
    document.getElementById("tab2_p5").innerHTML = format_prize(l5_r)

}


function on_focus(){
    //**reconstruct_branch()**/
    vars_def()
    slider_value_update()
    tab_value_update()


    document.getElementsByClassName("autentica_result")[0].innerHTML = format_prize(result_a)
    document.getElementsByClassName("autentica_result")[1].innerHTML = format_prize(result_a)

    document.getElementsByClassName("rendita_result")[0].innerHTML = format_prize(result_r)
    document.getElementsByClassName("rendita_result")[1].innerHTML = format_prize(result_r)
}

on_focus()

let input = document.querySelectorAll(".input");
input.forEach(input => {

input.addEventListener('input', function(event) {
    console.log("")
    var cursorPosition = getCaretPosition(input);
    var valueBefore = input.value;
    var lengthBefore = input.value.length;
    var specialCharsBefore = getSpecialCharsOnSides(input.value);
    var number = removeThousandSeparators(input.value);
    var currentValue = input.value

  if (input.value == '') {
    return;
  }
  else if (input.value == 'NaN'){
    input.value = ''
    return;
  }
  
  input.value = formatNumber(number.replace(getCommaSeparator(), '.'));

    // if deleting the comma, delete it correctly
  if (currentValue == input.value && currentValue == valueBefore.substr(0, cursorPosition) + getThousandSeparator() + valueBefore.substr(cursorPosition)) {
    input.value = formatNumber(removeThousandSeparators(valueBefore.substr(0, cursorPosition-1) + valueBefore.substr(cursorPosition)));
    cursorPosition--;
  }
  
  // if entering comma for separation, leave it in there (as well support .000)
  var commaSeparator = getCommaSeparator();
    if (valueBefore.endsWith(commaSeparator) || valueBefore.endsWith(commaSeparator+'0') || valueBefore.endsWith(commaSeparator+'00') || valueBefore.endsWith(commaSeparator+'000')) {
    input.value = input.value + valueBefore.substring(valueBefore.indexOf(commaSeparator));
  }

  // move cursor correctly if thousand separator got added or removed
  var specialCharsAfter = getSpecialCharsOnSides(input.value);
  if (specialCharsBefore[0] < specialCharsAfter[0]) {
        cursorPosition += specialCharsAfter[0] - specialCharsBefore[0];
  } else if (specialCharsBefore[0] > specialCharsAfter[0]) {
        cursorPosition -= specialCharsBefore[0] - specialCharsAfter[0];
  }
  setCaretPosition(input, cursorPosition);
  
  currentValue = input.value;
});
});

function getSpecialCharsOnSides(x, cursorPosition) {
    var specialCharsLeft = x.substring(0, cursorPosition).replace(/[0-9]/g, '').length;
  var specialCharsRight = x.substring(cursorPosition).replace(/[0-9]/g, '').length;
  return [specialCharsLeft, specialCharsRight]
}

function formatNumber(x) {
   return getNumberFormat().format(x);
}

function removeThousandSeparators(x) {
  return x.toString().replace(new RegExp(escapeRegExp(getThousandSeparator()), 'g'), "");
}

function getThousandSeparator() {
  return getNumberFormat().format('1000').replace(/[0-9]/g, '')[0];
}

function getCommaSeparator() {
  return getNumberFormat().format('0.01').replace(/[0-9]/g, '.')[0];
}

function getNumberFormat() {
    return new Intl.NumberFormat();
}

/* From: http://stackoverflow.com/a/6969486/496992 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
** From: http://stackoverflow.com/a/2897229/496992
*/
function getCaretPosition (oField) {
  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}

/* From: http://stackoverflow.com/a/512542/496992 */
function setCaretPosition(elem, caretPos) {
    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}


/***

document.getElementsByClassName("cancel")[0].addEventListener("click", image_cancel(this.count))
function image_cancel(){
    document.getElementById("tip1").value = ""
    on_focus()
}
document.getElementById("plus-1").addEventListener("click", image_plus)
function image_plus(){
    document.getElementsByClassName("calculator__tip")[0].value++
    on_focus()
}
***/