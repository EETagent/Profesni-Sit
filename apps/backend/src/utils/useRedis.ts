import { createClient as redisCreateClient } from "redis";

const useRedis = async (callback: any) => {
  const redisClient = await redisCreateClient();
  await redisClient.connect();
  const result = await callback(redisClient);
  await redisClient.quit();
  return result;
};

export default useRedis;
