/* TEMPLATE:
  ,{
    stageName: "Idol Stage Name",
    realName: "Real Full Name",
    birthday: "YYYY-MM-DD",
    group: "Group Name",
    subunit: null,  // or "Subunit Name"
    image: "",  // Paste image URL here
    color: "#ff8cc6"  // Any hex color for fallback
  } */

const idolDatabase = [

  // nct dream
  {
    stageName: "Mark",
    realName: "Mark Lee",
    birthday: "1999-08-02",
    group: "NCT",
    subunit: ["NCT Dream", "NCT 127", "NCT U"],
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Renjun",
    realName: "Huang Renjun",
    birthday: "2000-03-23",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "",
    color: "#5aa9ff"
  },
  {
    stageName: "Jeno",
    realName: "Lee Jeno",
    birthday: "2000-04-23",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Haechan",
    realName: "Lee Donghyuck",
    birthday: "2000-06-06",
    group: "NCT",
    subunit: ["NCT Dream", "NCT 127", "NCT U"],
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Jaemin",
    realName: "Na Jaemin",
    birthday: "2000-08-13",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "",
    color: "#ff4d6d"
  },
  {
    stageName: "Chenle",
    realName: "Zhong Chenle",
    birthday: "2001-11-22",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Jisung",
    realName: "Park Jisung",
    birthday: "2002-02-05",
    group: "NCT",
    subunit: "NCT Dream",
    image: "",
    color: "#ff8cc6"
  },

  // nct 127
  {
    stageName: "Taeyong",
    realName: "Lee Taeyong",
    birthday: "1995-07-01",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "",
    color: "#ff1744"
  },
  {
    stageName: "Johnny",
    realName: "John Suh",
    birthday: "1995-02-09",
    group: "NCT",
    subunit: "NCT 127",
    image: "",
    color: "#00bcd4"
  },
  {
    stageName: "Yuta",
    realName: "Nakamoto Yuta",
    birthday: "1995-10-26",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "",
    color: "#ff9800"
  },
  {
    stageName: "Doyoung",
    realName: "Kim Dongyoung",
    birthday: "1996-02-01",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "",
    color: "#9c27b0"
  },
  {
    stageName: "Jaehyun",
    realName: "Jung Jaehyun",
    birthday: "1997-02-14",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Jungwoo",
    realName: "Kim Jungwoo",
    birthday: "1998-02-19",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "",
    color: "#ff8cc6"
  },

  // wayv
  {
    stageName: "Kun",
    realName: "Qian Kun",
    birthday: "1996-01-01",
    group: "NCT",
    subunit: "WayV",
    image: "",
    color: "#3f51b5"
  },
  {
    stageName: "Ten",
    realName: "Chittaphon Leechaiyapornkul",
    birthday: "1996-02-27",
    group: "NCT",
    subunit: "WayV",
    image: "",
    color: "#e91e63"
  },
  {
    stageName: "Xiaojun",
    realName: "Xiao Dejun",
    birthday: "1999-08-08",
    group: "NCT",
    subunit: ["WayV", "NCT U"],
    image: "",
    color: "#ff5722"
  },
  {
    stageName: "Hendery",
    realName: "Wong Kunhang",
    birthday: "1999-09-28",
    group: "NCT",
    subunit: "WayV",
    image: "",
    color: "#4caf50"
  },
  {
    stageName: "Yangyang",
    realName: "Liu Yangyang",
    birthday: "2000-10-10",
    group: "NCT",
    subunit: "WayV",
    image: "",
    color: "#00bcd4"
  },
  {
    stageName: "WINWIN",
    realName: "Liu Yangyang",
    birthday: "1997-10-28",
    group: "NCT",
    subunit: ["WayV", "NCT 127", "NCT U"],
    image: "",
    color: "#00bcd4"
  },

  // wishies
  {
    stageName: "Sion",
    realName: "Oh Sion",
    birthday: "2002-05-11",
    group: "NCT",
    subunit: "NCT WISH",
    image: "",
    color: "#ffb6c1"
  },
  {
    stageName: "Riku",
    realName: "Maeda Riku",
    birthday: "2003-06-28",
    group: "NCT",
    subunit: "NCT WISH",
    image: "",
    color: "#add8e6"
  },

  // tws
  {
    stageName: "Shinyu",
    realName: "Shin Junghwan",
    birthday: "2003-11-07",
    group: "TWS",
    subunit: null,
    image: "",
    color: "#ffd700"
  },
  {
    stageName: "Dohoon",
    realName: "Kim Dohoon",
    birthday: "2004-01-30",
    group: "TWS",
    subunit: null,
    image: "",
    color: "#ff69b4"
  },

  // riize
  {
    stageName: "Wonbin",
    realName: "Park Wonbin",
    birthday: "2002-03-02",
    group: "RIIZE",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Anton",
    realName: "Lee Chanyoung",
    birthday: "2004-03-21",
    group: "RIIZE",
    subunit: null,
    image: "",
    color: "#1db954"
  },

  // skz
  {
    stageName: "Bang Chan",
    realName: "Christopher Bang",
    birthday: "1997-10-03",
    group: "Stray Kids",
    subunit: null,
    image: "",
    color: "#ff1744"
  },
  {
    stageName: "Hyunjin",
    realName: "Hwang Hyunjin",
    birthday: "2000-03-20",
    group: "Stray Kids",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Felix",
    realName: "Lee Felix",
    birthday: "2000-09-15",
    group: "Stray Kids",
    subunit: null,
    image: "",
    color: "#00bcd4"
  },

  // le sserafim
  {
    stageName: "Sakura",
    realName: "Miyawaki Sakura",
    birthday: "1998-03-19",
    group: "LE SSERAFIM",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Chaewon",
    realName: "Kim Chaewon",
    birthday: "2000-08-01",
    group: "LE SSERAFIM",
    subunit: null,
    image: "",
    color: "#9c27b0"
  },

  // (g)i-dle
  {
    stageName: "Soyeon",
    realName: "Jeon Soyeon",
    birthday: "1998-08-26",
    group: "(G)I-DLE",
    subunit: null,
    image: "",
    color: "#ff5722"
  },
  {
    stageName: "Miyeon",
    realName: "Cho Miyeon",
    birthday: "1997-01-31",
    group: "(G)I-DLE",
    subunit: null,
    image: "",
    color: "#3f51b5"
  },

  // bts
  {
    stageName: "RM",
    realName: "Kim Namjoon",
    birthday: "1994-09-12",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Jin",
    realName: "Kim Seokjin",
    birthday: "1992-12-04",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#5aa9ff"
  },
  {
    stageName: "Suga",
    realName: "Min Yoongi",
    birthday: "1993-03-09",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#ff4d6d"
  },
  {
    stageName: "J-Hope",
    realName: "Jung Hoseok",
    birthday: "1994-02-18",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Jimin",
    realName: "Park Jimin",
    birthday: "1995-10-13",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "V",
    realName: "Kim Taehyung",
    birthday: "1995-12-30",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Jungkook",
    realName: "Jeon Jungkook",
    birthday: "1997-09-01",
    group: "BTS",
    subunit: null,
    image: "",
    color: "#00bcd4"
  },

  // txt
  {
    stageName: "Yeonjun",
    realName: "Choi Yeonjun",
    birthday: "1999-09-13",
    group: "TXT",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Soobin",
    realName: "Choi Soobin",
    birthday: "2000-12-05",
    group: "TXT",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Beomgyu",
    realName: "Choi Beomgyu",
    birthday: "2001-03-13",
    group: "TXT",
    subunit: null,
    image: "",
    color: "#ff4d6d"
  },
  {
    stageName: "Taehyun",
    realName: "Kang Taehyun",
    birthday: "2002-02-05",
    group: "TXT",
    subunit: null,
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Huening Kai",
    realName: "Kai Kamal Huening",
    birthday: "2002-08-14",
    group: "TXT",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },

  // enha
  {
    stageName: "Heeseung",
    realName: "Lee Heeseung",
    birthday: "2001-10-15",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#0055ff"
  },
  {
    stageName: "Jay",
    realName: "Jay Park",
    birthday: "2002-04-20",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#ff0000"
  },
  {
    stageName: "Jake",
    realName: "Sim Jaeyun",
    birthday: "2002-11-15",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#008000"
  },
  {
    stageName: "Sunghoon",
    realName: "Park Sunghoon",
    birthday: "2002-12-08",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#ff8c00"
  },
  {
    stageName: "Sunoo",
    realName: "Kim Sunoo",
    birthday: "2003-06-24",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#e91e63"
  },
  {
    stageName: "Jungwon",
    realName: "Yang Jungwon",
    birthday: "2004-02-09",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#9c27b0"
  },
  {
    stageName: "Ni-ki",
    realName: "Nishimura Riki",
    birthday: "2005-12-09",
    group: "ENHYPEN",
    subunit: null,
    image: "",
    color: "#03a9f4"
  },

  // svt
  {
    stageName: "S.Coups",
    realName: "Choi Seungcheol",
    birthday: "1995-08-08",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "",
    color: "#ffc107"
  },
  {
    stageName: "Jeonghan",
    realName: "Yoon Jeonghan",
    birthday: "1995-10-04",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "",
    color: "#f44336"
  },
  {
    stageName: "Joshua",
    realName: "Hong Jisoo",
    birthday: "1995-12-30",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "",
    color: "#2196f3"
  },
  {
    stageName: "Jun",
    realName: "Wen Junhui",
    birthday: "1996-06-10",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "",
    color: "#4caf50"
  },
  {
    stageName: "Hoshi",
    realName: "Kwon Soonyoung",
    birthday: "1996-06-15",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "",
    color: "#ff5722"
  },
  {
    stageName: "Wonwoo",
    realName: "Jeon Wonwoo",
    birthday: "1996-07-17",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "",
    color: "#9c27b0"
  },
  {
    stageName: "Woozi",
    realName: "Lee Jihoon",
    birthday: "1996-11-22",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "",
    color: "#3f51b5"
  },
  {
    stageName: "DK",
    realName: "Lee Seokmin",
    birthday: "1997-02-18",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "",
    color: "#00bcd4"
  },
  {
    stageName: "Mingyu",
    realName: "Kim Mingyu",
    birthday: "1997-04-06",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "",
    color: "#8bc34a"
  },
  {
    stageName: "The8",
    realName: "Xu Minghao",
    birthday: "1997-11-07",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "",
    color: "#e91e63"
  },
  {
    stageName: "Seungkwan",
    realName: "Boo Seungkwan",
    birthday: "1998-01-16",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "",
    color: "#ffc107"
  },
  {
    stageName: "Vernon",
    realName: "Choi Hansol",
    birthday: "1998-02-18",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "",
    color: "#9e9e9e"
  },
  {
    stageName: "Dino",
    realName: "Lee Chan",
    birthday: "1999-02-11",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "",
    color: "#ff9800"
  },

  // twice
  {
    stageName: "Nayeon",
    realName: "Im Nayeon",
    birthday: "1995-09-22",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#ffb6c1"
  },
  {
    stageName: "Jeongyeon",
    realName: "Yoo Jeongyeon",
    birthday: "1996-11-01",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#add8e6"
  },
  {
    stageName: "Momo",
    realName: "Hirai Momo",
    birthday: "1996-11-09",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#ff69b4"
  },
  {
    stageName: "Sana",
    realName: "Minatozaki Sana",
    birthday: "1996-12-29",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#ffd700"
  },
  {
    stageName: "Jihyo",
    realName: "Park Jihyo",
    birthday: "1997-02-01",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#ff4500"
  },
  {
    stageName: "Mina",
    realName: "Myoui Mina",
    birthday: "1997-03-24",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#32cd32"
  },
  {
    stageName: "Dahyun",
    realName: "Kim Dahyun",
    birthday: "1998-05-28",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#00ced1"
  },
  {
    stageName: "Chaeyoung",
    realName: "Son Chaeyoung",
    birthday: "1999-04-23",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#ff6347"
  },
  {
    stageName: "Tzuyu",
    realName: "Chou Tzuyu",
    birthday: "1999-06-14",
    group: "TWICE",
    subunit: null,
    image: "",
    color: "#4169e1"
  },

  // aespa
  {
    stageName: "Karina",
    realName: "Yoo Jimin",
    birthday: "2000-04-11",
    group: "aespa",
    subunit: null,
    image: "",
    color: "#7b1fa2"
  },
  {
    stageName: "Giselle",
    realName: "Uchinaga Aeri",
    birthday: "2000-10-30",
    group: "aespa",
    subunit: null,
    image: "",
    color: "#f06292"
  },
  {
    stageName: "Winter",
    realName: "Kim Minjeong",
    birthday: "2001-01-01",
    group: "aespa",
    subunit: null,
    image: "",
    color: "#03a9f4"
  },
  {
    stageName: "Ningning",
    realName: "Ning Yizhuo",
    birthday: "2002-10-23",
    group: "aespa",
    subunit: null,
    image: "",
    color: "#ffeb3b"
  },

  // blackpink
  {
    stageName: "Jisoo",
    realName: "Kim Jisoo",
    birthday: "1995-01-03",
    group: "BLACKPINK",
    subunit: null,
    image: "",
    color: "#ff69b4"
  },
  {
    stageName: "Jennie",
    realName: "Jennie Kim",
    birthday: "1996-01-16",
    group: "BLACKPINK",
    subunit: null,
    image: "",
    color: "#000000"
  },
  {
    stageName: "Rosé",
    realName: "Roseanne Park",
    birthday: "1997-02-11",
    group: "BLACKPINK",
    subunit: null,
    image: "",
    color: "#ffb6c1"
  },
  {
    stageName: "Lisa",
    realName: "Lalisa Manobal",
    birthday: "1997-03-27",
    group: "BLACKPINK",
    subunit: null,
    image: "",
    color: "#ffd700"
  },

  // ive
  {
    stageName: "Yujin",
    realName: "An Yujin",
    birthday: "2003-09-01",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#ff4d6d"
  },
  {
    stageName: "Gaeul",
    realName: "Kim Gaeul",
    birthday: "2002-09-24",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Rei",
    realName: "Naoi Rei",
    birthday: "2004-02-03",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Wonyoung",
    realName: "Jang Wonyoung",
    birthday: "2004-08-31",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Liz",
    realName: "Kim Jiwon",
    birthday: "2004-11-21",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Leeseo",
    realName: "Lee Hyunseo",
    birthday: "2007-02-21",
    group: "IVE",
    subunit: null,
    image: "",
    color: "#5aa9ff"
  },

  // new jeans
  {
    stageName: "Minji",
    realName: "Kim Minji",
    birthday: "2004-05-07",
    group: "NewJeans",
    subunit: null,
    image: "",
    color: "#00bcd4"
  },
  {
    stageName: "Hanni",
    realName: "Pham Ngoc Han",
    birthday: "2004-10-06",
    group: "NewJeans",
    subunit: null,
    image: "",
    color: "#ff9800"
  },
  {
    stageName: "Danielle",
    realName: "Danielle Marsh",
    birthday: "2005-04-11",
    group: "NewJeans",
    subunit: null,
    image: "",
    color: "#4caf50"
  },
  {
    stageName: "Haerin",
    realName: "Kang Haerin",
    birthday: "2006-05-15",
    group: "NewJeans",
    subunit: null,
    image: "",
    color: "#9c27b0"
  },
  {
    stageName: "Hyein",
    realName: "Lee Hyein",
    birthday: "2008-04-21",
    group: "NewJeans",
    subunit: null,
    image: "",
    color: "#e91e63"
  },

  // illit
  {
    stageName: "Yunah",
    realName: "Noh Yunah",
    birthday: "2004-01-15",
    group: "ILLIT",
    subunit: null,
    image: "",
    color: "#ffb6c1"
  },
  {
    stageName: "Minju",
    realName: "Park Minju",
    birthday: "2004-05-11",
    group: "ILLIT",
    subunit: null,
    image: "",
    color: "#add8e6"
  },
  {
    stageName: "Moka",
    realName: "Sakai Moka",
    birthday: "2004-10-08",
    group: "ILLIT",
    subunit: null,
    image: "",
    color: "#ff69b4"
  },
  {
    stageName: "Wonhee",
    realName: "Lee Wonhee",
    birthday: "2007-06-26",
    group: "ILLIT",
    subunit: null,
    image: "",
    color: "#ffd700"
  },
  {
    stageName: "Iroha",
    realName: "Hokazono Iroha",
    birthday: "2008-02-04",
    group: "ILLIT",
    subunit: null,
    image: "",
    color: "#32cd32"
  },

  // ateez
  {
    stageName: "Hongjoong",
    realName: "Kim Hongjoong",
    birthday: "1998-11-07",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#ff5722"
  },
  {
    stageName: "Seonghwa",
    realName: "Park Seonghwa",
    birthday: "1998-04-03",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#2196f3"
  },
  {
    stageName: "Yunho",
    realName: "Jeong Yunho",
    birthday: "1999-03-23",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#8bc34a"
  },
  {
    stageName: "Yeosang",
    realName: "Kang Yeosang",
    birthday: "1999-06-15",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#9e9e9e"
  },
  {
    stageName: "San",
    realName: "Choi San",
    birthday: "1999-07-10",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Mingi",
    realName: "Song Mingi",
    birthday: "1999-08-09",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#5aa9ff"
  },
  {
    stageName: "Wooyoung",
    realName: "Jung Wooyoung",
    birthday: "1999-11-26",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Jongho",
    realName: "Choi Jongho",
    birthday: "2000-10-12",
    group: "ATEEZ",
    subunit: null,
    image: "",
    color: "#ff4d6d"
  },

  // zb1
  {
    stageName: "Hanbin",
    realName: "Sung Hanbin",
    birthday: "2001-06-13",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#00ced1"
  },
  {
    stageName: "Jiwoong",
    realName: "Kim Jiwoong",
    birthday: "1998-12-14",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#ff6347"
  },
  {
    stageName: "Zhang Hao",
    realName: "Zhang Hao",
    birthday: "2000-07-25",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#4169e1"
  },
  {
    stageName: "Matthew",
    realName: "Seok Matthew",
    birthday: "2002-05-28",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Taerae",
    realName: "Kim Taerae",
    birthday: "2002-07-14",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Ricky",
    realName: "Shen Quanrui",
    birthday: "2004-05-20",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#ffd700"
  },
  {
    stageName: "Gyuvin",
    realName: "Kim Gyuvin",
    birthday: "2004-08-30",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#4caf50"
  },
  {
    stageName: "Gunwook",
    realName: "Park Gunwook",
    birthday: "2005-01-10",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#ff9800"
  },
  {
    stageName: "Yujin",
    realName: "Han Yujin",
    birthday: "2007-03-20",
    group: "ZEROBASEONE",
    subunit: null,
    image: "",
    color: "#e91e63"
  },

  // soloists
  {
    stageName: "IU",
    realName: "Lee Jieun",
    birthday: "1993-05-16",
    group: "Soloist",
    subunit: null,
    image: "",
    color: "#ff69b4"
  },
  {
    stageName: "Taeyeon",
    realName: "Kim Taeyeon",
    birthday: "1989-03-09",
    group: "Soloist",
    subunit: null,
    image: "",
    color: "#9d5fff"
  },
  {
    stageName: "Taemin",
    realName: "Lee Taemin",
    birthday: "1993-07-18",
    group: "SHINee",
    subunit: null,
    image: "",
    color: "#1db954"
  },
  {
    stageName: "Baekhyun",
    realName: "Byun Baekhyun",
    birthday: "1992-05-06",
    group: "EXO",
    subunit: null,
    image: "",
    color: "#ff8cc6"
  },
  {
    stageName: "Chungha",
    realName: "Kim Chungha",
    birthday: "1996-02-09",
    group: "Soloist",
    subunit: null,
    image: "",
    color: "#ffa500"
  },
  {
    stageName: "Somi",
    realName: "Jeon Somi",
    birthday: "2001-03-09",
    group: "Soloist",
    subunit: null,
    image: "",
    color: "#ffd700"
  }
];
