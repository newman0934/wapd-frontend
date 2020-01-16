<template>
  <div class="pt-3">
    <div class="header">
      <div class="info">
        <h1>WE ALWAYS PERSIST IN DREAM</h1>
        <p>
          <a>我們總是堅持著夢想</a>
        </p>
        <hr />
        <p>
          <a>
            WAP-D想要告訴大家 可以透過改變和堅持 完成自己的夢想
            <br />沒有經營不了的自己
            <br />我們集合流行品味與思考來協助您的穿著定位
            <br />
            <strong>"穿著可以反映思想 思想可以改變穿著"</strong>
            <br />我們做得到 相信你也可以!
            <br />on Jan 07, 2020
          </a>
        </p>
        <div class="meta">
          <a target="_b" class="arrow">▼ ▼ ▼</a>
        </div>
      </div>
    </div>

    <section>
      <div class="container timeline">
        <div class="time-card left">
          <div class="content">
            <h2>2020年</h2>
            <p class="text-left">
              網路品牌
              <strong>WAP-D</strong>正式成立
            </p>
          </div>
        </div>

        <div class="time-card right">
          <div class="content">
            <h2>2019年末</h2>
            <p class="text-left">
              我們用全新的時裝面貌
              <strong>DREAM MAN</strong>(太平店)呈現我們對夢想的堅持
            </p>
          </div>
        </div>

        <div class="time-card left">
          <div class="content">
            <h2>2019年初</h2>
            <p class="text-left">APEX_DANDY(一中店) 復活了，並且帶著信心歸來，這十幾年間，不斷挫折與成長，每每到了放棄邊緣，都是夢想提醒了我們</p>
          </div>
        </div>

        <div class="time-card right">
          <div class="content">
            <h2>2017年</h2>
            <p class="text-left">一中K.G.T用熱誠的街邊經營 告訴大家我們的堅定</p>
          </div>
        </div>

        <div class="time-card left">
          <div class="content">
            <h2>2007年</h2>
            <p class="text-left">
              2007年的夏天 一個年輕大膽的夢想
              <strong>APEX_DANDY</strong>在逢甲誕生了。用一種時尚花花公子的姿態，慢慢影響時下年輕人的穿著思維，我們經歷了日系、街頭、嘻哈、韓流、美式休閒等等流行趨勢。
              <br />之間也遭遇了商場店鋪火災的厄運! 一度遭受連根拔起，在那個網路尚未普及且智慧型手機也未人手一機的時代...
              <br />往後幾年apex遭遇不斷搬遷，並且時運與機緣不佳，毫無頭緒。
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
    <hr />
    <section class="store-info py-4 container" id="contact">
      <h2>我們的店</h2>
      <div class="row mt-4">
        <div class="col-sm-6">
          <div class="card">
            <img src="./../static/apex1.jpg" class="card-img-top" alt="apex_dandy" />
            <div class="card-body">
              <h5 class="card-title">APEX_DANDY</h5>
              <p class="card-text">地址：台中市北區三民路三段106巷(G2000旁巷子口)</p>
              <p class="card-text">營業時間：下午3:00 - 凌晨11:00</p>
              <a
                href="https://www.facebook.com/KGT-小庵的店-405388429508237/"
                class="btn btn-primary"
              >Facebook</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <img src="./../static/dream2.jpg" class="card-img-top" alt="dream_man" />
            <div class="card-body">
              <h5 class="card-title">DREAM MAN</h5>
              <p class="card-text">地址：台中市太平區太順路403號</p>
              <p class="card-text">營業時間：上午11:00 - 下午9:00</p>

              <a
                href="https://www.facebook.com/Dream-Man夢幻男人-111226990294129/"
                class="btn btn-primary"
              >Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  mounted() {
    const { el } = this.$route.query;
    if (el) {
      this.gotoElement(el);
    }
  },
  methods: {
    gotoElement(el) {
      return this.$scrollTo(el, 500);
    }
  }
};
</script>
<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
html,
body {
  margin: 0;
  height: 120%;
  font-family: "Josefin Sans", sans-serif;
}
* {
  box-sizing: border-box;
}

.header {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  height: 60vw;
  min-height: 400px;
  max-height: 650px;
  min-width: 300px;
  color: #eee;
  background: #1b2030
    url(https://images.unsplash.com/photo-1571993142257-eae0b44cf0f1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ)
    50% 0 no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}
.header:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.12) 40%,
    rgba(27, 32, 48, 1) 100%
  );
}
.header a {
  color: #eee;
}
.info {
  flex: 0 0 auto;
  width: 50%;
}
.info {
  width: 100%;
  padding: 15% 10% 0 10%;
  text-align: center;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.8);
}
.info h4,
.meta {
  font-size: 0.7em;
}
.meta {
  font-style: italic;
}
.timeline {
  padding: 5% 10%;
  text-align: justify;
}

.twtr {
  margin-top: 100px;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  background-color: white;
  font-family: Helvetica, sans-serif;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: #474e5d;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

/* Container around content */
.time-card {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  color: white;
  width: 50%;
  border: none;
}

/* The circles on the timeline */
.time-card::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid #ff9f55;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: 0;
}

/* Place the container to the right */
.right {
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid #474e5d;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #474e5d;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid #474e5d;
  border-width: 10px 10px 10px 0;
  border-color: transparent #474e5d transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -10px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: #474e5d;
  position: relative;
  border-radius: 6px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }

  /* Full-width containers */
  .time-card {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .time-card::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 10px;
  }

  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>