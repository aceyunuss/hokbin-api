exports.getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

// exports.setReturn = (http_code, data) => {
//   const status_code = http_code;
//   switch (http_code) {
//     case 200:
//       message = "OK";
//       break;
//     case 500:
//       message = "Internal Server Error";
//       break;
//     case 504:
//       message = "Gateway Timeout";
//       break;
//     case 403:
//       message = "Forbidden";
//       break;
//     case 404:
//       message = "Not Found";
//       break;
//     default:
//       message = "Not Found";
//   }

//   return { status_code, message, data };
// };
