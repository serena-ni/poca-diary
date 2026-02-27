/* template:
  ,{
    stageName: "Stage Name",
    realName: "Real Full Name",
    birthday: "YYYY-MM-DD",
    group: "Group Name",
    subunit: null,  (or "Subunit Name")
    image: "",  (paste image URL)
    color: "#ff8cc6"  (fallback hex color)
  } 
*/

const idolDatabase = [

  // nct dream
  {
    stageName: "Mark",
    realName: "Mark Lee",
    birthday: "1999-08-02",
    group: "NCT",
    subunit: ["NCT Dream", "NCT 127", "NCT U"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Bmrx2mHSyLg7WuGqzAvDIV8LF7VauFaF7w&s",
    color: "#ff8cc6"
  },
  {
    stageName: "Renjun",
    realName: "Huang Renjun",
    birthday: "2000-03-23",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "https://www.mensnonno.jp/wp-content/uploads/2021/06/2021_07_nctdream_q1under_renjun.png",
    color: "#5aa9ff"
  },
  {
    stageName: "Jeno",
    realName: "Lee Jeno",
    birthday: "2000-04-23",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "https://i.pinimg.com/736x/a4/e9/7c/a4e97cd931c660ca05e1d80270f8ee83.jpg",
    color: "#9d5fff"
  },
  {
    stageName: "Haechan",
    realName: "Lee Donghyuck",
    birthday: "2000-06-06",
    group: "NCT",
    subunit: ["NCT Dream", "NCT 127", "NCT U"],
    image: "https://external-preview.redd.it/ncts-haechan-to-sit-out-inkigayo-and-other-nct-dream-v0-BqeUfCsuR3RFb-4r-rAWFGVvDF99VKylG8A43f14qNQ.jpg?auto=webp&s=8ba17c4d25c2e76e767b3b9300e53da7ae8cca36",
    color: "#ffa500"
  },
  {
    stageName: "Jaemin",
    realName: "Na Jaemin",
    birthday: "2000-08-13",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "https://i.pinimg.com/736x/c5/63/b6/c563b6547a41a8dfeec55cc47b9a2fea.jpg",
    color: "#ff4d6d"
  },
  {
    stageName: "Chenle",
    realName: "Zhong Chenle",
    birthday: "2001-11-22",
    group: "NCT",
    subunit: ["NCT Dream", "NCT U"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6PACN1_wdJl8haV7CSt0hdYJgRXtBENImtg&s",
    color: "#1db954"
  },
  {
    stageName: "Jisung",
    realName: "Park Jisung",
    birthday: "2002-02-05",
    group: "NCT",
    subunit: "NCT Dream",
    image: "https://i.pinimg.com/736x/84/bf/8c/84bf8c692c681d48b4f44c26153f4581.jpg",
    color: "#ff8cc6"
  },

  // nct 127
  {
    stageName: "Taeyong",
    realName: "Lee Taeyong",
    birthday: "1995-07-01",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "https://www.nme.com/wp-content/uploads/2024/01/taeyong-new-music-getty.jpg",
    color: "#ff1744"
  },
  {
    stageName: "Johnny",
    realName: "John Suh",
    birthday: "1995-02-09",
    group: "NCT",
    subunit: "NCT 127",
    image: "https://cdn.kpopping.com/idols/Johnny/profile.webp",
    color: "#00bcd4"
  },
  {
    stageName: "Yuta",
    realName: "Nakamoto Yuta",
    birthday: "1995-10-26",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK0w-BjXTf0U859x1JwJfJzpCMkxFvVmu61Q&s",
    color: "#ff9800"
  },
  {
    stageName: "Doyoung",
    realName: "Kim Dongyoung",
    birthday: "1996-02-01",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "https://newsimg.koreatimes.co.kr/2024/04/22/1eee8651-4dcb-4f11-b4a3-0abbf8b2c358.jpg",
    color: "#9c27b0"
  },
  {
    stageName: "Jaehyun",
    realName: "Jung Jaehyun",
    birthday: "1997-02-14",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "https://kpopreviewed.com/wp-content/uploads/2024/08/jaehyun-dandelion-roses.png?w=1045&h=628&crop=1",
    color: "#1db954"
  },
  {
    stageName: "Jungwoo",
    realName: "Kim Jungwoo",
    birthday: "1998-02-19",
    group: "NCT",
    subunit: ["NCT 127", "NCT U"],
    image: "https://koreajoongangdaily.joins.com/data/photo/2025/10/30/b712f281-00d6-43b4-80fc-e93a165c6e68.jpg",
    color: "#ff8cc6"
  },

  // wayv
  {
    stageName: "Kun",
    realName: "Qian Kun",
    birthday: "1996-01-01",
    group: "NCT",
    subunit: "WayV",
    image: "https://static.wikia.nocookie.net/kboy-group/images/f/f4/KUN_NCT_U_icon.png/revision/latest?cb=20230823152447",
    color: "#3f51b5"
  },
  {
    stageName: "Ten",
    realName: "Chittaphon Leechaiyapornkul",
    birthday: "1996-02-27",
    group: "NCT",
    subunit: "WayV",
    image: "https://static.wikia.nocookie.net/kboy-group/images/4/42/TEN_NCT_U_icon.png/revision/latest?cb=20230823150537",
    color: "#e91e63"
  },
  {
    stageName: "Xiaojun",
    realName: "Xiao Dejun",
    birthday: "1999-08-08",
    group: "NCT",
    subunit: ["WayV", "NCT U"],
    image: "https://legacy.kpopping.com/94/2/250104-Wayv-Xiaojun-ON-THE-Way-Concert-in-Hong-Kong-documents-1.jpeg",
    color: "#ff5722"
  },
  {
    stageName: "Hendery",
    realName: "Wong Kunhang",
    birthday: "1999-09-28",
    group: "NCT",
    subunit: "WayV",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10np52luxMNgNa3kIdmX6uDM8CqGYZsHPiA&s",
    color: "#4caf50"
  },
  {
    stageName: "Yangyang",
    realName: "Liu Yangyang",
    birthday: "2000-10-10",
    group: "NCT",
    subunit: "WayV",
    image: "https://static.wikia.nocookie.net/kboy-group/images/7/71/YANGYANG_icon.png/revision/latest/thumbnail/width/360/height/360?cb=20251202044016",
    color: "#00bcd4"
  },
  {
    stageName: "Winwin",
    realName: "Dong Sicheng",
    birthday: "1997-10-28",
    group: "NCT",
    subunit: ["WayV", "NCT 127", "NCT U"],
    image: "https://static.wikia.nocookie.net/kboy-group/images/7/7d/WINWIN_icon.png/revision/latest?cb=20231031001559",
    color: "#add8e6"
  },

  // wishies
  {
    stageName: "Sion",
    realName: "Oh Sion",
    birthday: "2002-05-11",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlA0XX6nEthgqVysvnmfDdHb5-TtS3iAbgNA&s",
    color: "#ff8cc6"
  },
  {
    stageName: "Riku",
    realName: "Maeda Riku",
    birthday: "2003-06-28",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://6.soompi.io/wp-content/uploads/image/20250203075228_riku.jpeg?s=900x600&e=t",
    color: "#add8e6"
  },
  {
    stageName: "Yushi",
    realName: "Tokuno Yushi",
    birthday: "2004-04-05",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://i.pinimg.com/736x/79/3e/5c/793e5cbfb6c1579154c9faed7823fa25.jpg",
    color: "#00bcd4"
  },
  {
    stageName: "Ryo",
    realName: "Hirose Ryo",
    birthday: "2003-06-28",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://kprofiles.com/wp-content/uploads/2023/07/IMG_4082.webp",
    color: "#9c27b0"
  },
  {
    stageName: "Jaehee",
    realName: "Kim Daeyoung",
    birthday: "2005-06-21",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPIqJjB2pQZxLkfaGbuQ4PEKyMrjk7fMU1SQ&s",
    color: "#1db954"
  },
  {
    stageName: "Sakuya",
    realName: "Fujinaga Sakuya",
    birthday: "2007-11-18",
    group: "NCT",
    subunit: "NCT WISH",
    image: "https://external-preview.redd.it/nct-wishs-sakuya-to-perform-seated-after-suffering-minor-v0-YZxGCDzAwl4LVYI47CQZHEZ58vohrIfiAZwA0ET7wGY.jpg?auto=webp&s=cc535b76ec465a6fa3d8d253b576a7795296f6f8",
    color: "#add8e6"
  },

  // tws
  {
    stageName: "Shinyu",
    realName: "Shin Junghwan",
    birthday: "2003-11-07",
    group: "TWS",
    subunit: null,
    image: "https://i.namu.wiki/i/xAr1RG16EpETXIPBWfdOiL7j6F3zZavs0wjsEpUdoKnX0XjJ00CZ3bRpR97cPFvrnynDnH6ds48pztDM1AG90w.webp",
    color: "#ffd700"
  },
  {
    stageName: "Dohoon",
    realName: "Kim Dohoon",
    birthday: "2004-01-30",
    group: "TWS",
    subunit: null,
    image: "https://0.soompi.io/wp-content/uploads/2025/02/22184425/Dohoon.jpg",
    color: "#add8e6"
  },
  {
    stageName: "Hanjin",
    realName: "Han Zhen",
    birthday: "2006-01-05",
    group: "TWS",
    subunit: null,
    image: "https://i.namu.wiki/i/GGa3y_1Wev5fjH51LV2BRbfucFPGjxlZyJeC2euC075Ba8tXbcQmNJmVqQ9tyxWCi2-FQSE41IaV0eKOddDgxg.webp",
    color: "#1db954"
  },
  {
    stageName: "Youngjae",
    realName: "Choi Youngjae",
    birthday: "2005-05-31",
    group: "TWS",
    subunit: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/YOUNGJAE_of_TWS_at_Music_Bank_20240202.png",
    color: "#ff69b4"
  },
  {
    stageName: "Jihoon",
    realName: "Han Jihoon",
    birthday: "2006-03-28",
    group: "TWS",
    subunit: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/JIHOON_of_TWS_at_Music_Bank_20240126.png",
    color: "#00bcd4"
  },
  {
    stageName: "Kyungmin",
    realName: "Lee Kyungmin",
    birthday: "2007-10-02",
    group: "TWS",
    subunit: null,
    image: "https://assets.bandwagon.asia/system/tinymce/image/file/9989/content_content_TWS_KYUNGMIN__4_.webp",
    color: "#9d5fff"
  },

  // riize
  {
    stageName: "Wonbin",
    realName: "Park Wonbin",
    birthday: "2002-03-02",
    group: "RIIZE",
    subunit: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYByBS1uH5UTF36bTezgEH7iEGUZLVqnakHg&s",
    color: "#9d5fff"
  },
  {
    stageName: "Anton",
    realName: "Lee Chanyoung",
    birthday: "2004-03-21",
    group: "RIIZE",
    subunit: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjX0BKI-C2o5zW6_thwUUUofyhYsXWCMjMg&s",
    color: "#1db954"
  },
  {
    stageName: "Shotaro",
    realName: "Osaki Shotaro",
    birthday: "2000-11-25",
    group: "RIIZE",
    subunit: null,
    image: "https://www.generasia.com/w/images/thumb/f/fd/Shotaro_2020.jpg/500px-Shotaro_2020.jpg",
    color: "#add8e6"
  },
  {
    stageName: "Eunseok",
    realName: "Song Eun-seok",
    birthday: "2001-03-19",
    group: "RIIZE",
    subunit: null,
    image: "https://static.wikia.nocookie.net/riize/images/e/e6/Get_A_Guitar_Training_Days_2_-_Eunseok_2.jpg/revision/latest?cb=20230922013941",
    color: "#00bcd4"
  },
  {
    stageName: "Sungchan",
    realName: "Jung Sungchan",
    birthday: "2001-09-13",
    group: "RIIZE",
    subunit: null,
    image: "https://static.wikia.nocookie.net/kpop/images/3/37/NCT_Sungchan_Resonance_Part.1_concept_photo_%281%29.png/revision/latest/scale-to-width-down/1200?cb=20200928222854",
    color: "#ff4d6d"
  },
  {
    stageName: "Sohee",
    realName: "Lee Sohee",
    birthday: "2003-11-21",
    group: "RIIZE",
    subunit: null,
    image: "https://i.mydramalist.com/1wpN15_5c.jpg",
    color: "#1db954"
  },
  
  // skz
  {
    stageName: "Bang Chan",
    realName: "Christopher Bang",
    birthday: "1997-10-03",
    group: "Stray Kids",
    subunit: null,
    image: "https://i.redd.it/happy-birthday-bang-chan-smile-appreciation-post-hope-skz-v0-ruqqcx2ogvsf1.jpg?width=600&format=pjpg&auto=webp&s=8a4d144c721e6dee63e786e07b2a0114381887e9",
    color: "#ff1744"
  },
  {
    stageName: "Hyunjin",
    realName: "Hwang Hyunjin",
    birthday: "2000-03-20",
    group: "Stray Kids",
    subunit: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Hyunjin_of_Stray_Kids%2C_September_24%2C_2025.png",
    color: "#ffa500"
  },
  {
    stageName: "Felix",
    realName: "Lee Felix",
    birthday: "2000-09-15",
    group: "Stray Kids",
    subunit: null,
    image: "https://cwxzygvczfupnbvclufg.supabase.co/storage/v1/object/public/group/groups/stray-kids/members/felix-1765417347424-Felix_of_Stray_Kids_at_a_Louis_Vuitton_event,_August_22,_2025.png",
    color: "#ff4d6d"
  },
  {
    stageName: "Lee Know",
    realName: "Lee Minho",
    birthday: "1998-10-25",
    group: "Stray Kids",
    subunit: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/20240503_Lee_Know_of_Stray_Kids.png/250px-20240503_Lee_Know_of_Stray_Kids.png",
    color: "#00bcd4"
  },
  {
    stageName: "Han",
    realName: "Han Jisung",
    birthday: "2000-09-14",
    group: "Stray Kids",
    subunit: null,
    image: "https://w0.peakpx.com/wallpaper/65/693/HD-wallpaper-han-jisung-han-jisung-skz-stray-kids-tayr.jpg",
    color: "#ff9800"
  },
  {
    stageName: "Changbin",
    realName: "Seo Changbin",
    birthday: "1999-08-11",
    group: "Stray Kids",
    subunit: null,
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-03-26_um_11.26.33.png?v=1711448818",
    color: "#3f51b5"
  },
  {
    stageName: "Seungmin",
    realName: "Kim Seungmin",
    birthday: "2000-09-22",
    group: "Stray Kids",
    subunit: null,
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-04-03_um_15.25.42.png?v=1712153255",
    color: "#1db954"
  },
  {
    stageName: "I.N",
    realName: "Yang Jeongin",
    birthday: "2001-02-08",
    group: "Stray Kids",
    subunit: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/I.N_of_Stray_Kids%2C_March_2%2C_2025.png",
    color: "#ff8cc6"
  },

  // bts
  {
    stageName: "RM",
    realName: "Kim Namjoon",
    birthday: "1994-09-12",
    group: "BTS",
    subunit: null,
    image: "https://m.media-amazon.com/images/M/MV5BNmUzYjVlYTUtNWEyMC00NjBlLTk0Y2UtZjhkY2EwMmY0ZjExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    color: "#1db954"
  },
  {
    stageName: "Jin",
    realName: "Kim Seokjin",
    birthday: "1992-12-04",
    group: "BTS",
    subunit: null,
    image: "https://www.billboard.com/wp-content/uploads/2022/10/jin-bts-the-astronaut-cr-bighit-music-2022-billboard-2-1548.jpg?w=942&h=628&crop=1",
    color: "#5aa9ff"
  },
  {
    stageName: "Suga",
    realName: "Min Yoongi",
    birthday: "1993-03-09",
    group: "BTS",
    subunit: null,
    image: "https://www.musicmundial.com/en/wp-content/uploads/2022/03/BTS-Suga-reveals-lying-to-ARMY-about-his-health.jpg",
    color: "#ff4d6d"
  },
  {
    stageName: "J-Hope",
    realName: "Jung Hoseok",
    birthday: "1994-02-18",
    group: "BTS",
    subunit: null,
    image: "https://btsarchive.com/wp-content/uploads/2025/08/1741470045-image.png",
    color: "#ff8cc6"
  },
  {
    stageName: "Jimin",
    realName: "Park Jimin",
    birthday: "1995-10-13",
    group: "BTS",
    subunit: null,
    image: "https://www.billboard.com/wp-content/uploads/media/Jimin-bts-press-photo-2017-billboard-1548.jpg",
    color: "#ffa500"
  },
  {
    stageName: "V",
    realName: "Kim Taehyung",
    birthday: "1995-12-30",
    group: "BTS",
    subunit: null,
    image: "https://assets.teenvogue.com/photos/5e95c549bc87b7000910f702/4:3/w_3712,h_2784,c_limit/GettyImages-1199371669.jpg",
    color: "#9d5fff"
  },
  {
    stageName: "Jungkook",
    realName: "Jeon Jungkook",
    birthday: "1997-09-01",
    group: "BTS",
    subunit: null,
    image: "https://bangtanfacts.com/wp-content/uploads/2022/03/BTS-jungkook.webp",
    color: "#00bcd4"
  },

  // txt
  {
    stageName: "Yeonjun",
    realName: "Choi Yeonjun",
    birthday: "1999-09-13",
    group: "TXT",
    subunit: null,
    image: "https://0.soompi.io/wp-content/uploads/2025/07/04195708/Yeonjun.jpg",
    color: "#9d5fff"
  },
  {
    stageName: "Soobin",
    realName: "Choi Soobin",
    birthday: "2000-12-05",
    group: "TXT",
    subunit: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW60ntGap5J_8yn-VKMA94T2iGV_5FFlfXnQ&s",
    color: "#ffa500"
  },
  {
    stageName: "Beomgyu",
    realName: "Choi Beomgyu",
    birthday: "2001-03-13",
    group: "TXT",
    subunit: null,
    image: "https://cdn.k-ennews.com/news/photo/202507/9331_25033_2416.jpg",
    color: "#ff4d6d"
  },
  {
    stageName: "Taehyun",
    realName: "Kang Taehyun",
    birthday: "2002-02-05",
    group: "TXT",
    subunit: null,
    image: "https://img.sbs.co.kr/newsnet/etv/upload/2025/07/21/30001004315_700.jpg",
    color: "#1db954"
  },
  {
    stageName: "Huening Kai",
    realName: "Kai Kamal Huening",
    birthday: "2002-08-14",
    group: "TXT",
    subunit: null,
    image: "https://www.allkpop.com/upload/2024/11/content/020355/web_data/allkpop_1730535368_20241102-hueningkai.jpg",
    color: "#ff8cc6"
  },

  // enha
  {
    stageName: "Heeseung",
    realName: "Lee Heeseung",
    birthday: "2001-10-15",
    group: "ENHYPEN",
    subunit: null,
    image: "https://nolae.eu/cdn/shop/articles/heesung-enhypen-profil-188837.jpg?v=1720011725&width=1920",
    color: "#0055ff"
  },
  {
    stageName: "Jay",
    realName: "Jay Park",
    birthday: "2002-04-20",
    group: "ENHYPEN",
    subunit: null,
    image: "https://nolae.eu/cdn/shop/articles/jay-enhypen-profil-662196.jpg?v=1720447969&width=1920",
    color: "#ff0000"
  },
  {
    stageName: "Jake",
    realName: "Sim Jaeyun",
    birthday: "2002-11-15",
    group: "ENHYPEN",
    subunit: null,
    image: "https://i.redd.it/change-in-jakes-looks-v0-n131xu2j4kvc1.jpg?width=736&format=pjpg&auto=webp&s=a0f4d72316d448c5e68639a48a5cec3afaf38127",
    color: "#008000"
  },
  {
    stageName: "Sunghoon",
    realName: "Park Sunghoon",
    birthday: "2002-12-08",
    group: "ENHYPEN",
    subunit: null,
    image: "https://www.nme.com/wp-content/uploads/2022/02/enhypen-sunghoon-rhinitis-surgery-belift-lab-2022.jpeg",
    color: "#ff8c00"
  },
  {
    stageName: "Sunoo",
    realName: "Kim Sunoo",
    birthday: "2003-06-24",
    group: "ENHYPEN",
    subunit: null,
    image: "https://w0.peakpx.com/wallpaper/305/345/HD-wallpaper-band-music-enhypen-sunoo-singer.jpg",
    color: "#e91e63"
  },
  {
    stageName: "Jungwon",
    realName: "Yang Jungwon",
    birthday: "2004-02-09",
    group: "ENHYPEN",
    subunit: null,
    image: "https://phinf.wevpstatic.net/MjAyMjEwMjZfMjgy/MDAxNjY2NzY0NDU1NzA2.cfNFig0X_MP67boyWL50-NRA_RBnO1CWebOjSa1t158g.h0u5uJgp2LxE4juTWm4SH-ZCeexhvzSE9gt8s_CHj0Ug.JPEG/a9fa0e3f-9d65-4baf-8bf0-75197b0e4742.jpeg",
    color: "#9c27b0"
  },
  {
    stageName: "Ni-ki",
    realName: "Nishimura Riki",
    birthday: "2005-12-09",
    group: "ENHYPEN",
    subunit: null,
    image: "https://wallpapers.com/images/hd/niki-enhypen-aesthetic-h7pf0h6cgx266iuk.jpg",
    color: "#03a9f4"
  },

  // svt
  {
    stageName: "S.Coups",
    realName: "Choi Seungcheol",
    birthday: "1995-08-08",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "https://i.pinimg.com/736x/d6/e6/6e/d6e66ed9d94105ba6fd2d5052eda1552.jpg",
    color: "#ffc107"
  },
  {
    stageName: "Jeonghan",
    realName: "Yoon Jeonghan",
    birthday: "1995-10-04",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "https://i.pinimg.com/736x/22/b9/46/22b946d43375f39cb65d70fdefb5e3c0.jpg",
    color: "#f44336"
  },
  {
    stageName: "Joshua",
    realName: "Hong Jisoo",
    birthday: "1995-12-30",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "https://wallpapercave.com/wp/wp10865665.jpg",
    color: "#2196f3"
  },
  {
    stageName: "Jun",
    realName: "Wen Junhui",
    birthday: "1996-06-10",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "https://www.hellokpop.com/wp-content/uploads/2021/02/seventeen-jun-1-660x400.jpg",
    color: "#4caf50"
  },
  {
    stageName: "Hoshi",
    realName: "Kwon Soonyoung",
    birthday: "1996-06-15",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "https://wallpapers.com/images/featured/hoshi-c4f6qhq8w9at9rau.jpg",
    color: "#ff5722"
  },
  {
    stageName: "Wonwoo",
    realName: "Jeon Wonwoo",
    birthday: "1996-07-17",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "https://i.pinimg.com/474x/0a/f3/ea/0af3ea54c99f38886ea6b821f4f5057a.jpg",
    color: "#9c27b0"
  },
  {
    stageName: "Woozi",
    realName: "Lee Jihoon",
    birthday: "1996-11-22",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "https://wallpapercave.com/wp/wp10872706.jpg",
    color: "#3f51b5"
  },
  {
    stageName: "DK",
    realName: "Lee Seokmin",
    birthday: "1997-02-18",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "https://www.nme.com/wp-content/uploads/2023/02/DK-seventeen-pledis-hybe-200223.jpg",
    color: "#00bcd4"
  },
  {
    stageName: "Mingyu",
    realName: "Kim Mingyu",
    birthday: "1997-04-06",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "https://www.hollywoodreporter.com/wp-content/uploads/2025/02/S25_MINGYU_PR_logo_1.jpg?crop=0px%2C3px%2C1080px%2C605px&resize=2000%2C1126",
    color: "#8bc34a"
  },
  {
    stageName: "The8",
    realName: "Xu Minghao",
    birthday: "1997-11-07",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "https://i.pinimg.com/1200x/57/d0/26/57d0265a71e606e2c18f367053f1037f.jpg",
    color: "#e91e63"
  },
  {
    stageName: "Seungkwan",
    realName: "Boo Seungkwan",
    birthday: "1998-01-16",
    group: "SEVENTEEN",
    subunit: "Vocal Unit",
    image: "https://w0.peakpx.com/wallpaper/984/277/HD-wallpaper-music-seventeen-seventeen-band-seungkwan-seventeen.jpg",
    color: "#ffc107"
  },
  {
    stageName: "Vernon",
    realName: "Choi Hansol",
    birthday: "1998-02-18",
    group: "SEVENTEEN",
    subunit: "Hip-Hop Unit",
    image: "https://www.billboard.com/wp-content/uploads/2022/12/vernon-seventeen-2022-billboard-1548.jpg",
    color: "#9e9e9e"
  },
  {
    stageName: "Dino",
    realName: "Lee Chan",
    birthday: "1999-02-11",
    group: "SEVENTEEN",
    subunit: "Performance Unit",
    image: "https://www.nme.com/wp-content/uploads/2022/06/seventeen-dino-pledis-hybe-130622.jpg",
    color: "#ff9800"
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvTMWtHgiz53huFpXfWHu_j43mhB3ZL-ySyQ&s",
    color: "#00ced1"
  },
  {
    stageName: "Jiwoong",
    realName: "Kim Jiwoong",
    birthday: "1998-12-14",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://www.asianjunkie.com/wp-content/uploads/2024/02/KimJiwoongZB1.jpg",
    color: "#ff6347"
  },
  {
    stageName: "Zhang Hao",
    realName: "Zhang Hao",
    birthday: "2000-07-25",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://kpopsingers.com/wp-content/uploads/2023/10/Zhang-Hao-gallery-1-jpg.webp",
    color: "#4169e1"
  },
  {
    stageName: "Matthew",
    realName: "Seok Matthew",
    birthday: "2002-05-28",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://dispatch.cdnser.be/cms-content/uploads/2023/11/06/9cd0c11a-faf3-46cc-9b6c-17438e4d7048.jpg",
    color: "#1db954"
  },
  {
    stageName: "Taerae",
    realName: "Kim Taerae",
    birthday: "2002-07-14",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0ooee1O0_8LkdeqBDxQMyocJfvi67s2x_w&s",
    color: "#9d5fff"
  },
  {
    stageName: "Ricky",
    realName: "Shen Quanrui",
    birthday: "2004-05-20",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://wallpapercave.com/wp/wp13980549.jpg",
    color: "#ffd700"
  },
  {
    stageName: "Gyuvin",
    realName: "Kim Gyuvin",
    birthday: "2004-08-30",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://external-preview.redd.it/zerobaseones-kim-gyu-vin-apologizes-for-his-choice-of-words-v0-YHAT8MnlGoLkymLpQgdQkL2E-vaozRkJpm5S9BsV1IY.jpg?width=640&crop=smart&auto=webp&s=ec1ac9c925b459d3a5fee17c78e0bf207e773785",
    color: "#4caf50"
  },
  {
    stageName: "Gunwook",
    realName: "Park Gunwook",
    birthday: "2005-01-10",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://external-preview.redd.it/231008-zero-base-ones-park-gunwook-criticized-for-comments-v0-J-O7104LFCx6XcNtp0K4ZBYSBmXrkzqOL_1Xmx6rFSM.jpg?auto=webp&s=28073f56c132c4750d888e7eafc5f5606aafe916",
    color: "#ff9800"
  },
  {
    stageName: "Yujin",
    realName: "Han Yujin",
    birthday: "2007-03-20",
    group: "ZEROBASEONE",
    subunit: null,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-IFVcVQrK-Fw4AcLThlwdOpjYy0zBAX6fw&s",
    color: "#e91e63"
  },

  // soloists
  {
    stageName: "Taemin",
    realName: "Lee Taemin",
    birthday: "1993-07-18",
    group: "SHINee",
    subunit: null,
    image: "https://www.nme.com/wp-content/uploads/2024/08/taemin-eternal-interview-main-image1.jpg",
    color: "#1db954"
  },
  {
    stageName: "Baekhyun",
    realName: "Byun Baekhyun",
    birthday: "1992-05-06",
    group: "EXO",
    subunit: null,
    image: "https://www.billboard.com/wp-content/uploads/2024/09/Baekhyun-Courtesy-of-INB100-2024-billboard-1548.jpg",
    color: "#ff8cc6"
  },
];
