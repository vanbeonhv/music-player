"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Em oi cu vui",
      singer: "Touliver",
      path: "./assets/music/Em-Oi-Cu-Vui-SlimV-Touliver.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w94_r1x1_png/covers/1/e/1ebc5f3387b2179e25e55d6208b16b04_1505907405.png",
    },
    {
      name: "Lac troi",
      singer: "MTP",
      path: "./assets/music/Lac-Troi-Triple-D-Remix-Son-Tung-M-TP.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/d/f/df9bcb5bc3a8b3171e43e15746d3d99b_1504857647.jpg",
    },
    {
      name: "Cung anh",
      singer: "Ngoc Dolil",
      path: "./assets/music/Cung-Anh-Ngoc-Dolil-Hagii-STee.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/a/d/ad67a7fbc0b8ad7eac660eb803cdeb21_1514533626.jpg",
    },
    {
      name: "Kem duyen",
      singer: "Rum",
      path: "./assets/music/Kem-Duyen-Rum-NIT-Masew.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/8/b/8bdfda3e88db5f9b6bf2ff7d1757e989_1510654845.jpg",
    },
    {
      name: "Ngay mai em di",
      singer: "Le Hieu",
      path: "./assets/music/Ngay-Mai-Em-Di-Touliver-Mix-Touliver-Le-Hieu-SOOBIN.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/6/9/695bf88c1edaf82e0bd5e085716e5598_1501654149.jpg",
    },
    {
      name: "Noi nay co anh",
      singer: "MTP",
      path: "./assets/music/Noi-Nay-Co-Anh-Masew-Bootleg-Son-Tung-M-TP-Masew.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg",
    },
    {
      name: "Yeu 5",
      singer: "Rhymastic",
      path: "./assets/music/Yeu-5-Rhymastic.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/covers/b/5/b5aa78aa102467e5648160a4ac93df8e_1486467660.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song) => {
      return `
              <div class="song">
                    <div class="thumb" style="background-image:
                        url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </div>
                </div>
                `;
    });
    $(".playlist").innerHTML = htmls.join("  ");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this; //Để lưu this trỏ vào app
    const cdWidth = cd.offsetWidth;

    // Xử lý phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //Xử lý khi click play
    console.log(playBtn);
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        //ở đây mà dùng this thì this trỏ vào playBtn
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };
    //Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  start: function () {
    //Định nghĩa các thuộc tính cho object
    this.defineProperties();

    //Lắng nghe /  xử lý các sự kiện (DOM events)
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    //Render danh sách bài hát/ playlist
    this.render();
  },
};

app.start();
