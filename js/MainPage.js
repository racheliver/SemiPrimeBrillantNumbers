/************************************************
*  Racheli Verechzon, ID: 305710071             *
*  ======================================       *
*   Programming in an Internet environment      *
*            Test   05/09/2018                  *
*  ======================================       *
************************************************/

/***********************************Summary********************************************************************************************************************
In this test, I am using a web application that includes html, css and js.The app will show interesting numbers. Almost a prime number and a brilliant number *
The user will enter in the txtInput text box any positive integer. And press one of the buttons.If the input is invalid, you will receive an error message as *
 a pop-up. Fill out the pop-up window as a new div that appears on the screen with the OK button and after the user clicks on it, it will disappear.          *
If the input is valid, all the near-primary and non-bright numbers in the range will be calculated between 1 and the number entered (we will denote it as n). *
The results will be displayed in Area D( Table shape)                                                                                                         *
***************************************************************************************************************************************************************/



/**********************MainPage*************************************************
A function that defined in a global space. Variables and functions defined     *
within the function are private and are not accessible outside the function.   *
The replay value of the function is also an object, thus showing the functions *
we want to reveal:getResult and initModule                                     *
*******************************************************************************/

/*********************validateInput*****************************************
If the input is invalid, you will receive an error message as a pop-up.    *
Fill out  pop-up window as a new div that appears on the screen with       *
the OK button and after you clicks on it, it will disappear.               *
i used sweetalert to show the styles you can check also on css"swal-overlay"
and in htmlFile there is a  script                                         *
****************************************************************************/

/**************************makeItJSON*******************************************************
Given a valid object in JS, it can be converted to a JSON string by the stringify function:*
I took the array of near-perfect and incomplete numbers and converted them into the JSON   *
string as we saw in the class                                                              *
********************************************************************************************/


/********************************buildArray********************************
The function accepts a row, a column, an array, and a number from the user*
And constructs a two-dimensional array to display the table in section D. *
***************************************************************************/

/******************getResults*******************************************************************************************************
In the module we added a variable named results that contains a json string that will save the results of the calculations.        *
The object contains two attributes - the not_brilliant attribute will maintain an array of all the near-primary and non-brilliant  *
numbers calculated in the last calculation. For example, in the example, if the user entered the number 23, one number is thought  *
to be almost elementary and not brilliant - 22, so there is one in the array. Note that each object has one attribute named b that *
 contains the value of the almost non-prime number.The function named getResults returns the result string as a json object        *
(as we learned in the class using the saved function JSONPARSE                                                                     *
************************************************************************************************************************************/

/******************************Prime Semiprime and perfect numbers function**************************************************
checkSemiprime: check if the number that send to the function is semiPrimt.                                                 *
checkForPerfect: check if the number that Semiprime is also *not* Perfect.                                                  *
nextPrime: An auxiliary function that I wrote, from Exercise 4 receives a number and returns the next one after it.         *
factorZ: An auxiliary function that I wrote, from Exercise 4 receives a number and send back array with the numbers factors.*
digitsCount: An auxiliary function that I wrote on class Exercise just count a number digits.                               *
****************************************************************************************************************************/

//htmlInTable FUNCTION  just make it by divs table to a real one//

var MainPage = function() {
  var results ;
    var initModule = function() {
        $("#button").click(clickListener);
        $("#button1").click(clickListener);
    };

    var clickListener = function(e) {
        $('.D').empty();
        var button = $("#button");

            var err = validateInput();
            if(err == true)
            {
              var input = $("#txtinput").val();
              var semiPrime = new Array();
              var primePerfect = new Array();
              for (var i = 1; i <= input; i++) {
                if(semiprime(i))
                {
                  semiPrime.push(i);
                }
              }
             primePerfect=checkForPerfect(semiPrime);
             twoDimensional  =  buildArray(Math.ceil(input/10),10,primePerfect,input);
             var htmlTableShow = htmlInTable(Math.ceil(input/10),10,twoDimensional,primePerfect);
             results=makeItJSON(primePerfect);
            }
    };


  function  makeItJSON(array){
      	var arr = new Array();
        for (var i = 0; i < array.length; i++) {
          var object = new Object();
          object.b=array[i];
          arr[i]=object;
        }
        var bigObject= new Object();
        bigObject.not_brilliant=arr;
        var json = JSON.stringify(bigObject);
        return json;
    }



function getResults(){
  return JSON.parse(results);
}
    function validateInput() {
        var w = $("#txtinput").val();

        var res = true;
        var errNull = "Must contain a value";
        var errNeg = "Value must be positive";
        var errInt= "Value must be Integer";
 				var errW = $("#divErrWeight");

        if(w == "")
        {
            res = false;
            $('#divErrAnswer').append('<div class="dialog""><div class="closebtn""></div></div>');
						$(".dialog").each( function() {
						    swal(errNull);
						});
        }
        else if(!(Number.isInteger(parseFloat(w))))
        {

            res = false;
            $('#divErrAnswer').append('<div class="dialog3""><div class="closebtn""></div></div>');
            $(".dialog3").each( function() {
                swal(errInt);
            });
            $("#txtinput").val("");
        }
        else if(parseInt(w) <= 0)
        {
            res = false;
						$('#divErrAnswer').append('<div class="dialog2""><div class="closebtn""></div></div>');
						$(".dialog2").each( function() {
								swal(errNeg);
						});
            $("#txtinput").val("");
        }

        else
            errW.html("");
        return res;
    }



    function buildArray(row,column,arr,num){
	     var matrix = new Array(row);

        for (var i = 0 ; i < row ; i++) {
         matrix[i] = new Array(column);}

        var m=1;
        for(var i = 0; i < column; i++){
	      for(var j =0; j < row; j++){
		     matrix[j][i]=m;m++;}}

	return matrix;
	}

  function htmlInTable(rows,cols,a,primePerfect){


		 var table = '';

	     for(var r = 0; r < rows; r++){
		   table += '<tr>';
		   for(var c = 0; c < cols; c++ ){
         if(primePerfect.includes(a[r][c]))
         {
             table += '<td bgcolor="#093">' + a[r][c] + "</td>";
         }
         else{
		         table += '<td>' + a[r][c] + "</td>";
            }
          }
	    table += '</tr>';}

          $('.D').append(  '<table>' );
          $('.D').append( table );
          $('.D').append(  '</table>' );

	}

  // Utility function to check whether
  // number is semiprime or not
  function checkSemiprime( num)
  {
      var cnt = 0;

      for (var i = 2; cnt < 2 && i * i <= num; ++i)
          while (num % i == 0)
              num /= i, ++cnt;

               // Increment count
                               // of prime numbers

      // If number is greater than 1, add it to
      // the count variable as it indicates the
      // number remain is prime number
      if (num > 1)
          ++cnt;

      // Return '1' if count is equal to '2' else
      // return '0'
      return cnt == 2;
  }

  // Function to print 'True' or 'False'
  // according to condition of semiprime
  function semiprime(n)
  {
      if (checkSemiprime(n))
      return true;
  }


  function checkForPerfect(array){
    var tempArray= new Array();
    for (var i = 0; i < array.length; i++) {
      var a= factorZ(array[i]);
      if((digitsCount(a[0]))!=(digitsCount(a[1])))
      tempArray.push(array[i]);
    }
    return tempArray;
  }


  function nextPrime(num)
  {
    while(true)
    {
      var isPrime=true;
      num+=1;
      var sqt =parseInt(Math.sqrt(num));
      for (var i = 2; i <= sqt; i++) {
        if(num%i===0){
        isPrime=false;
        break;
      }
      }
      if(isPrime)
      return parseInt(num);
    }
  }


  function digitsCount(num){
  	var count=0;
  	while(num>1)
  	{
  		num= num/10;
  		count++;
  	}
  	return count;
  }


  function factorZ(n){

    var p=2,factors = [];
       while (n!==1)
       {
             if(n % p === 0)
             {
               factors.push(p);
               n = n / p;
             }
            else
               p=nextPrime(p);
       }
      return factors;
  }


    return {getResults:getResults ,initModule : initModule };
}();




$(document).ready(function() {MainPage.initModule(); });
