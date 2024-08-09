$(document).ready(function() {

    function calculate(operation) {
        const n1 = parseFloat($("#num1").val());
        const n2 = parseFloat($("#num2").val());

        if (isNaN(n1) || isNaN(n2)) {
            $("#result").html("Please enter valid numbers");
            return;
        }

        $.ajax({
            url: `http://localhost:3040/${operation}?n1=${n1}&n2=${n2}`, 
            success: function(result) {
                $("#result").html("Result: " + result.data);
                updateHistory();
            },
            error: function() {
                $("#result").html("Error occurred. Please try again.");
            }
        });
    }

   
    function updateHistory() {
        // console.log("test")

        $.ajax({
            url: 'http://localhost:3040/history',
            success: function(data) {
                let historyHtml = '<ul class="collection">';
                data.forEach(calc => {
                    historyHtml += `
                        <li class="collection-item avatar">
                            <i class="material-icons circle blue">calculate</i>
                            <span class="title">${calc.number1} ${calc.operation} ${calc.number2} = ${calc.result}<br></span>
                            <p>
                               Date: ${new Date(calc.date).toLocaleString()}
                            </p>
                        </li>`;
                });
                historyHtml += '</ul>';
                $('#history').html(historyHtml);
            },
            error: function() {
                $('#history').html('Error fetching history.');
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


    updateHistory();
});
