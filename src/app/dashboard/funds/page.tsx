import FundsForm from "./FundsForm";

export default function AddFundsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add Funds to Wallet
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Top up your balance using Stripe or Crypto payments.</p>
          </div>
          <div className="mt-5">
            <FundsForm />
          </div>
        </div>
      </div>
    </div>
  );
}
