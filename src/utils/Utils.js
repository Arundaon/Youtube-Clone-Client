export const getAuthCookie = ()=>{
    const nameEQ = "Authorization" + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const setCurrentUser = (user)=>{
    fetch("http://localhost:8080/api/users/current",{
      method:"GET",
      headers:{
        'X-API-TOKEN':getAuthCookie()
      }
    })
      .then(async rawRes =>{
        const res = await rawRes.json();
        if(!rawRes.ok){
          throw new Error(res.errors)
        }
        user.value = res.data;
      })
      .catch(err => {
        console.log("problem getting user data")
      })
}

export const timeAgo = (date) => {
  const currentTime = new Date();
  const previousTime = new Date(date);

  const elapsed = currentTime - previousTime;
  const elapsedSeconds = Math.floor(elapsed / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedDays < 30) {
    return `${elapsedDays} days ago`;
  } else if (elapsedMonths < 12) {
    return `${elapsedMonths} months ago`;
  } else {
    return `${elapsedYears} years ago`;
  }
}