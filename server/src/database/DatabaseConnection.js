import mongoose from "mongoose";

const DatabaseConnection = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `mongodb+srv://PradeepSahu:PradeepSahu@cluster0.vkgne.mongodb.net/wisePayment?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`Database Connected!!! ${ConnectionInstance.connection.host}`);
    console.table([ConnectionInstance.connection.host]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// DatabaseConnection();
export default DatabaseConnection;

// mongodb+srv://PradeepSahu:<db_password>@cluster0.vkgne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
