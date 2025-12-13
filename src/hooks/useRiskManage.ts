import { RiskEnum } from "@/types/RiskEnum";
import { riskTypes } from "@/types/RiskTypes";

export const useRiskManage = () => {
  let preparedList = [];

  const giveRisk = (gameRisk: RiskEnum) => {
    preparedList = riskTypes[gameRisk];
    return preparedList;
  }

  return { giveRisk };
}