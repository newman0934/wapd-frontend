<p align="center">
  <img src="https://i.imgur.com/Yyxe9Fn.png" alt="wapd-front-end-vue-logo"/>
</p>


# WAPD-Front-End-Vue

WAP-D是一個販賣男性服裝的電商平台，可以讓消費者在這個平台上購買各式不同場合適用的男裝，包含西服、潮流服飾等等，另外WAP-D是在台中一中商圈起家的實體店面，店家希望跳脫實體店面的場域框架，在網路創造第二品牌，帶給消費者更多元便利的選擇，也計畫透過實體與虛擬雙重管道下手，讓更多的消費者能認識老闆堅持帶給顧客走在潮流尖端的男裝服飾夢想。

本專案前端主要利用 Vue 建立的電子商務平台，使用者身份分為三類：非會員的一般使用者（Visitor）、有會員身份的消費者（Ｍember）、商家管理員（Admin），另外後端功能搭配 [WAPD-BackEnd](https://github.com/newman0934/wapd-backend) 使用，打造一條龍的全方位的電商網站。

![商店截圖](https://miro.medium.com/max/3394/1*6nI6Np85RczCyoLyNSFjPA.jpeg)

## Menu - 目錄

- [Demo - 專案展示](#Demo---專案展示)
- [Initial - 專案緣起](#Initial---專案緣起)
- [Features - 專案功能](#Features---專案功能)
- [Content - 專案內容](#Content---專案內容)
- [Resource - 資料引用來源](#Resource---資料引用來源)
- [Declaration - 聲明](#Declaration---聲明)
- [Environment SetUp - 環境建置](#Environment-SetUp---環境建置)
- [Installing - 專案安裝流程](#Installing---專案安裝流程)
- [Contributor and Responsibility - 開發人員與職責分工](#Contributor-and-Responsibility---開發人員與職責分工)

## Demo - 專案展示

想認識我們，歡迎直接進入：[Demo Website](https://newman0934.github.io/wapd-frontend/)

預設會員與管理員測試帳號登入使用，帳密如下：

```
一般會員
  帳號：user1@example.com
  密碼：12345678
管理員
  帳號：root@example.com
  密碼：12345678
```
PS:請不要隨意刪除資料呦，避免影響他人的使用體驗,TKX!

## Initial - 專案緣起

專案緣起於 Alpha Camp 第四學期畢業專題發想，團隊共同決議要選擇「電商平台」為主題，利用Vue及Node.js Express打造前後端分離的作品，期望透過技術降低傳統店家要拓展線上通路的進入門檻。

剛好我們遇見了APEX DANDY的老闆，因為在台中同時擁有兩個不同風格男裝品牌- APEX DANDY(潮流服飾) ＆ DREAM MAN(特色西服)，希望有一個平台能整合實體店面的商品，讓他們的夢想觸及更多的消費者。

因此，以兩家店為基礎發想了WAP-D網路品牌，結合我們的技術為店家建立一個可以輕鬆開店的網路平台，擁有一條龍的前後台功能。

## Features - 專案功能

產品將使用者分為三個角色：使用者（未登入）、會員（已登入）及管理員（擁有admin權限者）

- 會員功能
    - 使用者可以註冊成為會員，並作為會員登入
    - 會員可以變更、或在忘記密碼時透過信箱收到的連結重設密碼
    - 會員可以查詢自己的所有訂單及其中一筆訂單的狀況
    - 會員在兩小時內未支付已成立的訂單時，系統會將其標記為失效
    - 會員可以將喜歡的商品加入Wishlist或自其移除

- 商品
    - 使用者可以在首頁看到最新商品資訊
    - 使用者可以瀏覽所有商品及單一商品詳細資訊
    - 使用者可以透過分類瀏覽不同商品

- 購物車
    - 使用者可以將商品加入購物車
    - 會員可以瀏覽購物車的內容
    - 會員可以在購物車中刪除或變動商品數量
    - 會員可以在購物車中輸入優惠序號

- 結帳
    - 會員可以選擇超商取貨、超商取貨付款或宅配
    - 會員可以通過藍新金流刷卡
    - 會員完成結帳後可收到一封訂單成立的信

- 後台
  - 管理者可以針對商品、類別等CRUD
  - 管理者可以透過交易查詢鈕更新訂單的付款狀態


## Content - 專案內容

# 前台

![index]()

![products]()

![login]()

![member]()

![checkout]()


# 後台



## Resource - 資料引用來源

- [Hito本舖](https://www.hitobp.com.tw/)
- [APEX-DANDY](https://www.facebook.com/KGT-小庵的店-405388429508237/)
- [DREAM MAN](https://www.facebook.com/Dream-Man夢幻男人-111226990294129/)

## Declaration - 聲明

- 本作品目前尚屬開發階段，商品圖片、內容等，純粹為演示前端使用，不做任何商業用途。

## Environment SetUp - 環境建置

- [Vue CLI 3](https://cli.vuejs.org/zh/guide/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/newman0934/wapd-frontend
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd wapd-frontend
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 啟動應用程式，本機運行

```
在 Terminal 輸入 npm run serve 指令
```
5. 設定後端伺服器

- 本地伺服器：相關設定請參考[WAPD-BackEnd](https://github.com/newman0934/wapd-backend)
  - 如使用本地伺服器，預設為seeder資料，請確認本地伺服器有正常運行。

- 或直接使用線上API，進入資料夾wapd-frontend > src > utils > helpers.js

  ```
  baseURL = 'https://wapd-backend.herokuapp.com/api'
  ```

現在，你可開啟任一瀏覽器輸入 [http://localhost:8080](http://localhost:8080) ，開始逛逛 WAPD 電商網囉！

PS:請不要隨意刪除資料呦，避免影響他人的使用體驗

帳密如下：

```
一般會員
  帳號：user1@example.com
  密碼：12345678
管理員
  帳號：root@example.com
  密碼：12345678
```

## Contributor and Responsibility - 開發人員與職責分工

- 前端開發

  - [Caesar Wang](https://github.com/newman0934)

  - [YunYuLo](https://github.com/YunYuLo)

- 後端開發

  - [Eason Lin](https://github.com/EasonLin0716)

