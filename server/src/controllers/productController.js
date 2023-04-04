const Product = require("../model/ProductModel");

exports.ProductList = async (req, res) => {
     try {
       const pageNo = Number(req.params.pageNo);
       const perPage = Number(req.params.perPage);
       const searchValue = req.params.searchKey;
       let skipRow = (pageNo - 1) * perPage;
       let Rows;
       let Total;
       console.log(searchValue === "0");
       if (searchValue !== "0") {
         console.log(searchValue);
         let searchRegex = { $regex: searchValue, $options: "i" };
         let searchQuery = { $or: [{ title: searchRegex }] };
         const result = await Product.aggregate([
           { $match: searchQuery },
           { $count: "total" },
         ]);
         Rows = await Product.aggregate([
           { $match: searchQuery },
           { $skip: skipRow },
           { $limit: perPage },
         ]);
         Total = result[0]["total"];
       } else {
         result = await Product.aggregate([{ $count: "total" }]);
         Rows = await Product.aggregate([
           { $skip: skipRow },
           { $limit: perPage },
         ]);
         Total = result[0]["total"];
       }
       res.status(200).json({ total: Total, row: Rows });
     } catch (error) {
         res.status(400).json("Data Not Found")
     }
}