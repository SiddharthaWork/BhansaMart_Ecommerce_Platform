import ReferalReward from '@/components/ui/reward-program/(pointconfig)/_ReferalReward';
import { useGetReferalRewards } from '@/server-action/api/referalreward';
const RewardReferalPage = () => {
  const { data: referalreward, isPending } = useGetReferalRewards();
  return (
    <div>
      <ReferalReward
        data={referalreward?.getPointPerReferrals ?? []}
        isPending={isPending}
      />
    </div>
  );
};

export default RewardReferalPage;
