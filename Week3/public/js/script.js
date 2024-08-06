const clickMe = () =>{
    alert("Thanks for clicking, have a noce day")
}

// $(document).ready(function(){

// $('#clickMeButton').click(()=>{
//     clickMe();
// })

// });

$(document).ready(function(){
    // $("#clickMeButton").click(function(){
    //     $.ajax({url: "http://localhost:3040/addTwonumber?n1=5&n2=13", 
    //         success: function(result){
    //             console.log(result.data)
    //     //   alert(result.data);
    //     $("#result").html(result.data);
    //     }
    // });
    //   });   
    // });

        function calculate(operation) {
            const n1 = parseFloat($("#num1").val());
            const n2 = parseFloat($("#num2").val());
    
            if (isNaN(n1) || isNaN(n2)) {
                $("#result").html("Please enter valid numbers");
                return;
            }
    
            $.ajax({
                url: `http://localhost:3040/${operation}?n1=${n1}&n2=${n2}`, 
                success: function(result){
                    $("#result").html("Result: " + result.data);
                }
            });
        }
    
        $("#addButton").click(() => calculate("addTwoNumber"));
        $("#subtractButton").click(() => calculate("subtractTwoNumber"));
        $("#multiplyButton").click(() => calculate("multiplyTwoNumber"));
        $("#divideButton").click(() => calculate("divideTwoNumber"));
        $("#clearButton").click(() => {
            $("#num1").val('');
            $("#num2").val('');
            $("#result").html("Result: ");
        });
    });
    