$(document).ready(function() {
    const socket = io(); 

    function calculate(operation) {
        const n1 = parseFloat($("#num1").val());
        const n2 = parseFloat($("#num2").val());

        if (isNaN(n1) || isNaN(n2)) {
            $("#result").html("Please enter valid numbers");
            return;
        }

        console.log(`Sending calculation request: ${operation} with n1=${n1} and n2=${n2}`);
        socket.emit('calculate', { n1, n2, operation });
    }

    socket.on('calculationResult', (data) => {
        console.log('Received calculation result:', data.result);
        $("#result").html("Result: " + data.result);
        updateHistory();
    });

    function updateHistory() {
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

    $("#addButton").click(() => calculate("add"));
    $("#subtractButton").click(() => calculate("subtract"));
    $("#multiplyButton").click(() => calculate("multiply"));
    $("#divideButton").click(() => calculate("divide"));
    $("#clearButton").click(() => {
        $("#num1").val('');
        $("#num2").val('');
        $("#result").html("Result: ");
    });

    updateHistory();
});
