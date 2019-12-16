<template>
    <div class="container indexCategory">
        <div class="row">
            <div class="col-sm-4 p-3"><img src="https://lorempixel.com/600/400"><a href="#" class="mask">pants</a></div>
            <div class="col-sm-4 p-3"><img src="https://lorempixel.com/600/400"><a href="#" class="mask">clothes</a></div>
            <div class="col-sm-4 p-3"><img src="https://lorempixel.com/600/400"><a href="#" class="mask">shoes</a></div>
        </div>
    </div>
</template>
<style>
.indexCategory img{
    width:100%;
    height: auto;
}
.indexCategory .col-sm-4{
    position: relative;
}
.mask{
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    transition: all 0.5s;
}
.mask:hover{
    background-color:rgba(100, 100, 100, 0.5);
    color: white;
    font-size:40px;
}
</style>