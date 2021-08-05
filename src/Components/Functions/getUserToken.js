const getUserToken = () => {
  const randomNumber1 = Math.random() * 10000;
  const randomNumber2 = Math.random() * 10000;
  const randomNumber3 = Math.random() * 10000;

  const tokenNumber1 = Math.round(randomNumber1);
  const tokenNumber2 = Math.round(randomNumber2);
  const tokenNumber3 = Math.round(randomNumber3);

  const token = `${tokenNumber1}r${tokenNumber2}p${tokenNumber3}$d`;
  sessionStorage.setItem("token", token);
};

export default getUserToken;
