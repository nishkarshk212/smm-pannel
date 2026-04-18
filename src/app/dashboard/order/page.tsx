import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import OrderForm from "./OrderForm";

export default async function NewOrderPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Place New Order
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Select a service and provide the target channel/group link.</p>
          </div>
          <div className="mt-5">
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  );
}
