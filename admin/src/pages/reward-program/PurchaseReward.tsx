import PurchaseReward from '@/components/ui/reward-program/(pointconfig)/_PurchaseReward';
import { useGetPurchaseReward } from '@/server-action/api/referalreward';
const PurchaseRewardPage = () => {
  const { data: purchaseReward, isPending } = useGetPurchaseReward();
  return (
    <div>
      <PurchaseReward
        data={purchaseReward?.getPurchaseRewards ?? []}
        isPending={isPending}
      />
    </div>
  );
};

export default PurchaseRewardPage;
