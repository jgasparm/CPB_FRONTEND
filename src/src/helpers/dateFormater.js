const formatDateEasy = (createDate) => {
    if (createDate) {
      const dateString = new Date(createDate);
      let year = dateString.getUTCFullYear();
      let month = (dateString.getUTCMonth() + 1).toString();
      month = month.length <= 1 ? "0" + month : month;
      let day = dateString.getUTCDate().toString();
      day = day.length <= 1 ? "0" + day : day;
      const date = year + "-" + month + "-" + day;
      return date;
    } else {
      return null;
    }
  };

  export {formatDateEasy};