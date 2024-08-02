const clickMe = () =>{
    alert("Thanks for clicking, have a noce day")
}

// $(document).ready(function(){

// $('#clickMeButton').click(()=>{
//     clickMe();
// })

// });

$(document).ready(function(){
    $("#clickMeButton").click(function(){
        $.ajax({url: "http://localhost:3040/addTwonumber?n1=5&n2=13", 
            success: function(result){
                console.log(result.data)
        //   alert(result.data);
          $("#result").html(result.data);
        }
    });
      });   
    });

    
    