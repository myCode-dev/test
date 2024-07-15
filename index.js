function music(){
    let musiconoroff = document.getElementById('music-onoroff'),
    musicoffline = document.getElementById('music-off-line'),
    themusic = document.querySelector("audio");

    if (themusic.paused) {
        themusic.play();
        musicoffline.classList.add("playmusic");
        musiconoroff.style.display = "none";
    }
    else {
        themusic.pause();
        musicoffline.classList.remove("playmusic");
    }
}

function JumpTo(id) {
    var jumpto = document.getElementById(id);
    jumpto.scrollIntoView({ block: 'start' , behavior: 'smooth' });
}


//
function reveal(){
    var reveals = document.querySelectorAll(".celebrate-section,#lookforward,.countdown-area-box>div,.video-area,.dress-code>p,.color-box,.timeline,.map,.traffic-guide,.invite-content,.invite-pic,.intro-content,.pic,.time,.celebrate-section p,.celebrate-section h2,.schedule,.schedule-box,.dresscode-box")
    for (var i = 0; i < reveals.length; i++){
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll",reveal)



function showgallery(id){
    document.getElementById(id).style.display = "flex";
    document.getElementById("gallery").style.display = "block";
    document.getElementById("closebutton").style.display = "block";

    if ( document.getElementById('video').style.display == "flex" ) {
        let musicoffline = document.getElementById('music-off-line'),
        themusic = document.querySelector("audio");
        
        themusic.pause();
        musicoffline.classList.remove("playmusic");
    };
}

function closegallery(){
    document.getElementById("gallery").style.display = "none";
    document.getElementById("closebutton").style.display = "none";
    document.getElementById("photo-gallery").style.display = "none";
    document.getElementById("video").style.display = "none";

    const iframeVideos = document.querySelectorAll("iframe");
    if (iframeVideos.length > 0) {
      iframeVideos.forEach((iframe) => {
        if (iframe.contentWindow) {
          if (iframe.src.startsWith("https://player.vimeo.com/")) {
            iframe.contentWindow.postMessage('{"method":"pause"}', "*");
          }
        }
      });
    };
}


//form

function AttendFunction(id){
    let Form1 = document.getElementById(id),
    notAttend = Form1.querySelectorAll(".not-attend"),
    ATTEND = Form1["ATTEND"],
    ADULT = Form1["ADULT"],
    KID = Form1["KID"],
    VEGAN = Form1["VEGAN"];


    if ( ATTEND.value == "出席" || ATTEND.value == "" ){
        ADULT.value = "";
        KID.value = "";
        VEGAN.value = "";
    
        Form1.querySelector(".not-attend-checked").removeAttribute("checked","");
    
        notAttend.forEach(noreply => {
            noreply.style.display = "block";
        });
    } else {
        ADULT.value = "0";
        KID.value = "0";
        VEGAN.value = "0";
    
        Form1.querySelector(".not-attend-checked").setAttribute("checked","");
    
        const notAttend = Form1.querySelectorAll(".not-attend");
    
        notAttend.forEach(noreply => {
            noreply.style.display = "none";
        });
    };
}

function InvitationFunction(){
    let Form1 = document.forms['form1'],
    INVITATION = Form1["INVITATION"],
    ADDRESS = Form1["ADDRESS"];

    if ( INVITATION.value == "需要" || INVITATION.value == "" ){  
        ADDRESS.value = "";
        ADDRESS.disabled = false;
    } else {
        ADDRESS.value = " ";
        ADDRESS.disabled = true;
    };
}

function submitform1(){
    let Form1 = document.getElementById('form1'),
    NAME = Form1["NAME"].value,
    ATTEND = Form1["ATTEND"].value,
    ADULT = Form1["ADULT"].value,
    KID = Form1["KID"].value,
    VEGAN = Form1["VEGAN"].value,
    INVITATION = Form1["INVITATION"].value,
    ADDRESS = Form1["ADDRESS"].value,
    MESSAGE = Form1["MESSAGE"].value;

    if( NAME === "" ){
        document.getElementById('Name').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請填寫姓名');
    } else if( ADULT === "" ){
        document.getElementById('Adult').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請回答大人人數');
    } else if( KID === "" ){
        document.getElementById('Kid').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請回答小孩人數');
    } else if( VEGAN === "" ){
        document.getElementById('Vegan').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請問是否有素食需求');
    } else if( INVITATION === "" ){
        document.getElementById('Invitation').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請問是否需要紙本喜帖');
    } else if( ADDRESS === "" ){
        document.getElementById('Address').scrollIntoView({ block: 'center' , behavior: 'smooth' });
        alert('請留下喜帖收件地址');
    } else{
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
        }
        
        const today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth()+1,
        day = today.getDate(),
        h = addZero(today.getHours()),
        m = addZero(today.getMinutes()),
        s = addZero(today.getSeconds()),
        time = h + ":" + m + ":" + s,
        SUBMITTIME = year+"/"+month+"/"+day+" "+time;

        
        $.ajax({
          type: "get",
          url: "https://script.google.com/macros/s/AKfycbyRhOhzsldgnkywX-MUiStXyRWgTNgUgK8zy0mQJnGfg8UUlcwrvYvOWo0ZIcRSevQPEQ/exec",
          data: {
            "SUBMITTIME": SUBMITTIME, 
            "NAME": NAME, 
            "ATTEND": ATTEND, 
            "ADULT": ADULT, 
            "KID": KID,
            "VEGAN": VEGAN,
            "INVITATION": INVITATION,
            "ADDRESS": ADDRESS,
            "MESSAGE": MESSAGE,
          },
          dataType: "JSON",
          success: submitform()
        });
    }
}  

function submitform(){
    const submitsuccess = document.getElementById('submit-success');
    submitsuccess.style.display = "flex";
}

function submitok(){
    window.location.reload();
}

//
var TheDay = new Date("Oct 26, 2024 12:00:00").getTime();

var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = TheDay - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML = minutes;
  document.getElementById("secs").innerHTML = seconds;
    
//   document.getElementById("countdown").innerHTML = "距離婚禮還剩 " + days + " 天<br>" + hours + " 小時 "
//   + minutes + " 分鐘 " + seconds + " 秒<br>期待與你們見面！";
    
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("countdown-area").innerHTML = "<h2>婚禮倒數</h2><br>IT'S TIME TO CELEBRATE !";
//     document.getElementById("countdown").innerHTML = "LET'S CELEBRATE !";
//   }
}, 1000);


function showRSVP() {
    window.location = 'https://www.google.com';
};