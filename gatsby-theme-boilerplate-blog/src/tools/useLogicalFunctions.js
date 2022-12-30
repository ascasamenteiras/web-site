import { useEffect, useState } from "react";

const useLogicalFunctions{
    
  const validateEmail = (email) => {
    if (email.slice(-1) === ".") {
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validateDate = (input) => {
    const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    const dates = input.split("/");
    if (parseInt(dates[2]) > 2022) {
      return reg.test(String(input).toLowerCase());
    } else {
      return false;
    }
  }
  const validateWhats = (input) => {
    const whatSlipt = input.split("-");
    if (input.length > 12) {
      if (whatSlipt[1].length === 4) {
        const reW = /(\([0-9]{2}\)\s?[0-9]{4,5}-?[0-9]{3,4})|([0-9]{10,11})|([0-9]{2}\s?[0-9]{8,9})/gm;
        return input.match(reW) ? true : false;
      }
    }
  }



  useEffect(() => {
    VMasker(document.querySelector('input[name="PHONE"')).maskPattern(
      "(99) 99999-9999"
    );
    VMasker(document.querySelector('input[name="FULLDATE"')).maskPattern(
      "99/99/9999"
    );
  }, []);
};

export default useLogicalFunctions;
