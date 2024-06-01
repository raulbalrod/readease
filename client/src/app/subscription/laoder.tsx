export default function LoaderSubscription() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-16 bg-black/20 bg-subscription-linear">
      <div className="flex justify-between w-1/2 px-4 py-2 bg-black/20 bg-paymentype-linear rounded-lg shadow-lg text-base font-medium">
        <p>Choose your payment method</p>

        <a
          href="/subscription"
          className="flex justify-center items-center gap-2 hover:text-neutral/80"
        >
          <p className="uppercase">price</p>
          <i className="bx bxs-edit"></i>
        </a>
      </div>
      <div>
        <i className="bx bx-loader-alt bx-lg  bx-spin"></i>
      </div>
      <p className="uppercase text-neutral/90">step 3 of 3</p>
      <h2 className="text-4xl font-semibold">Buy your plan</h2>
      <p className="text-neutral/90">
        Start your subscription by choosing a payment method and adding the
        details
      </p>
    </div>
  )
}
