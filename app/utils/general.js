exports.getPagination = (size, page) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data_res, page, limit) => {
  const { count: total_item, rows: data } = data_res;
  const current_page = page ? +page + 1 : 1;
  const total_page = Math.ceil(total_item / limit);

  return { total_item, total_page, current_page, data };
};
