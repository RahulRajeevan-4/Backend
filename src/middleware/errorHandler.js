// export function errorHandler(req, res) {
//     res.status(500).send({
//         error: {
//             message: "Something went wrong",
//         },
//     });
// }
export function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== "production";

  res.status(500).json({
    error: {
      message: "Something went wrong",
      ...(isDev ? { stack: err?.stack } : {}),
    },
  });
}

// export function handler404(err,req, res,next) {
//     res.status(404).send({
//         error: {
//             "message": "Not Found"
//         },
//     });
// }

export function handler404(req, res) {
  res.status(404).json({
    error: { message: "Not Found" },
  });
}


