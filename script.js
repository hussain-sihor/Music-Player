

let musicList=[
  {
    id:'1',
    songName:'Raatan Lambiya',
    artistName:'Jubin Nautiyal',
    image:'covers/1.jpg',
    songUrl:'songs/1.mp3',
  },
  {
    id:'2',
    songName:'Kesariya',
    artistName:'Arjit Singh',
    image:'covers/2.jpg',
    songUrl:'songs/2.mp3',
  },
  {
    id:'3',
    songName:'Tu Aake Dekhle',
    artistName:'King',
    image:'covers/3.jpg',
    songUrl:'songs/3.mp3',
  },
  {
    id:'4',
    songName:'Senorita',
    artistName:'Shawn Mendes & Camila Cabello',
    image:'covers/4.jpg',
    songUrl:'songs/4.mp3',
  },
  {
    id:'5',
    songName:'Arcade',
    artistName:'Duncan Laurence',
    image:'covers/5.jpg',
    songUrl:'songs/5.mp3',
  },
  {
    id:'6',
    songName:'Dil Chori',
    artistName:'Yo Yo Honey Singh',
    image:'covers/6.jpg',
    songUrl:'songs/6.mp3',
  },
  {
    id:'7',
    songName:'Tumhari Tasver',
    artistName:'Arjit Singh',
    image:'covers/7.jpg',
    songUrl:'songs/7.mp3',
  },
  {
    id:'8',
    songName:'Grateful',
    artistName:'NEEFEX',
    image:'covers/8.jpg',
    songUrl:'songs/8.mp3',
  },
  {
    id:'9',
    songName:'The Nights',
    artistName:'Avicii',
    image:'covers/9.jpg',
    songUrl:'songs/9.mp3',
  },
  {
    id:'10',
    songName:'123-Sofia',
    artistName:'Sofia Reyes',
    image:'covers/10.jpeg',
    songUrl:'songs/10.mp3',
  },
  {
    id:'11',
    songName:'Unstoppable',
    artistName:'Sia',
    image:'covers/11.jpg',
    songUrl:'songs/11.mp3',
  },
  {
    id:'12',
    songName:'Closer',
    artistName:'The Chainsmokers',
    image:'covers/12.jpeg',
    songUrl:'songs/12.mp3',
  },
  {
    id:'13',
    songName:'Makhana',
    artistName:'Yo Yo Honey Singh',
    image:'covers/13.jpeg',
    songUrl:'songs/13.mp3',
  },
  {
    id:'14',
    songName:'Ya Nabi',
    artistName:'Maher Zain',
    image:'covers/14.jpg',
    songUrl:'songs/14.mp3',
  },
  {
    id:'15',
    songName:'No love',
    artistName:'Shubh',
    image:'covers/15.jpg',
    songUrl:'songs/15.mp3',
  },
];

displayMusicList();
displayMusicCard();

let flag = true;

function displayMusicList(){
  let displayList = document.querySelector('.musicFolder');
  let newHTML = '';
  musicList.forEach(element => {
    newHTML +=
    `
    <div class="musicInfo">
          <div class="mi_image">
            <img src="${element.image}" alt="">
          </div>
          <div class="mi_name">
            <p>${element.songName}</p>
            <p>${element.artistName}</p>
          </div>
          <div class="mi_play">
            <i class="fa-solid fa-play control "  onclick="displayMusicCard(${element.id})"></i>
          </div>
        </div>
    `
  });
  displayList.innerHTML = newHTML;
}

function displayMusicCard(Id =0){
  
  let songName;
  let artistName;
  let image;
  let songUrl;
  let songId;

  if(Id == 0){
     songName = 'Raatan Lambiya';
     artistName = 'Arjit Singh';
     image = 'covers/1.jpg';
     songUrl = "songs/1.mp3";
     songId=0;
  }

  else{
    console.log(Id);

    let toPlay = [];
    toPlay.push(Id);

    let songToPlay = [];

    songToPlay = toPlay.map(itemId =>{
      for(let i=0; i<musicList.length ; i++){
        if(itemId == musicList[i].id){
          return musicList[i];
        }
      }})
      
      songName = songToPlay[0].songName;
      artistName = songToPlay[0].artistName;
      image = songToPlay[0].image;
      songUrl = songToPlay[0].songUrl;
      songId = songToPlay[0].id;
  }

  let displayCard = document.querySelector('.musicCard');
  let newHtml = 
  `
  <div>
  <img src="${image}" alt="" class="cardImage">
  <h1 class="songName">${songName}</h1>
  <p>${artistName}</p>
  <audio id ="song">
    <source src=${songUrl}>
  </audio>
  <input type="range" name="" id="progressBar" onchange ="progressBarChange()">
  <div class="controls">
    <div><i class="control fa-solid fa-backward" onclick ="backward(${songId})"></i></div>
    <div><i class="fa-solid fa-play" id="cntrl" onclick ="playPause()"></i></div>
    <div><i class="fa-solid fa-forward control" onclick ="forward(${songId})"></i></div>
  </div>
</div>
  `;
 
  displayCard.innerHTML = newHtml;
  let cntrl = document.querySelector('#cntrl');
  let progressBar = document.querySelector('#progressBar');
  let song = document.querySelector('#song');



  if(Id!=0){
   playPause();
  }
  progressBar.max=song.duration;
  progressBar.value=song.currentTime;

}

 function forward(Id){
      let toPlay = -1;

    if(Id == musicList.length){
      toPlay = 1;
    }
    else if(Id == 0){
      toPlay = 2;
    }
    else{
      toPlay = Id+1;
    }
      displayMusicCard(toPlay)
 }

 function backward(Id){
    let toPlay = -1;

    if(Id == 0 || Id == 1){
      toPlay = musicList.length;
    }
    else{
      toPlay = Id-1;
    }
      displayMusicCard(toPlay)
    }

  function playPause(){
   
    if(cntrl.classList.contains("fa-pause")){
      song.pause();
      cntrl.classList.remove("fa-pause");
      cntrl.classList.add("fa-play");
    }
    else{
      song.play();
      cntrl.classList.remove("fa-play");
      cntrl.classList.add("fa-pause");
      changeProgress();
      flag=false;
    }
  }

   function progressBarChange(){
    song.play();
    song.currentTime = progressBar.value;
    cntrl.classList.remove("fa-play");
    cntrl.classList.add("fa-pause");
    changeProgress();
  }

  function changeProgress(){
   progressBar.max = song.duration;
  if(flag){
    setInterval(()=>{
      progressBar.value = song.currentTime;
    },1000);
  }
 
   }
 
 
