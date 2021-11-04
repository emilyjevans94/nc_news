

exports.invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};

exports.PSQLerror = (err, req, res, next) => {
  console.log("in the PSQL error")
  console.log(err)
  if (err.code === '22P02'){ //INVALID TEXT REPRESENTATION
    res.status(400).send({msg: 'Bad request'})
  }
  if (err.code === '23503'){ //FOREIGN KEY VIOLATION
    res.status(400).send({msg: 'Bad request'})
  }
  else {
    next(err)
  }
}

exports.customError = (err, req, res, next) => {
  console.log("in the custom error")
  if (err.status && err.msg){
    console.log("in custom error")
    res.status(err.status).send({msg:err.msg})
  } else {
    next(err)
  }
}

