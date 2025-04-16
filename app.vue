<template>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

</template>
<style global>
body{
  background: radial-gradient(circle at 0% 0%, #0A2139 , #2E5B8D , #A6C7EB );
  background-image: url('~/assets/images/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b; 
  min-height: 100vh;
}

a{
  text-decoration: none;
  color: #1e293b; 

  :hover{
    color: #4573bf; 
  }
}
</style>