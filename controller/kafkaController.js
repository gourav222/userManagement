import KafkaConfig from "../kafka/config.js";

export const sendMessageToKafka = async (message) => {
  try {
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: message }];
    kafkaConfig.produce("my-topic", messages);
    // res.status(200).json({
    //   status: "Ok!",
    //   message: "Message successfully send!",
    // });
    return{
      status: "Ok!",
      message,
    }
  } catch (error) {
    console.log(error);
  }
};


