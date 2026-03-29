function Footer() {

return (

<div className="bg-[#232F3E] text-white mt-10">

{/* top links section */}

<div className="grid grid-cols-4 gap-10 px-20 py-12 text-sm">

{/* column 1 */}
<div>

<h2 className="font-bold mb-3">
Get to Know Us
</h2>

<ul className="space-y-2 text-gray-300">

<li className="hover:underline cursor-pointer">
About Amazon
</li>

<li className="hover:underline cursor-pointer">
Careers
</li>

<li className="hover:underline cursor-pointer">
Press Releases
</li>

<li className="hover:underline cursor-pointer">
Amazon Science
</li>

</ul>

</div>


{/* column 2 */}
<div>

<h2 className="font-bold mb-3">
Connect with Us
</h2>

<ul className="space-y-2 text-gray-300">

<li className="hover:underline cursor-pointer">
Facebook
</li>

<li className="hover:underline cursor-pointer">
Twitter
</li>

<li className="hover:underline cursor-pointer">
Instagram
</li>

</ul>

</div>


{/* column 3 */}
<div>

<h2 className="font-bold mb-3">
Make Money with Us
</h2>

<ul className="space-y-2 text-gray-300">

<li className="hover:underline cursor-pointer">
Sell on Amazon
</li>

<li className="hover:underline cursor-pointer">
Sell under Amazon Accelerator
</li>

<li className="hover:underline cursor-pointer">
Protect and Build Your Brand
</li>

<li className="hover:underline cursor-pointer">
Amazon Global Selling
</li>

<li className="hover:underline cursor-pointer">
Supply to Amazon
</li>

<li className="hover:underline cursor-pointer">
Become an Affiliate
</li>

<li className="hover:underline cursor-pointer">
Fulfilment by Amazon
</li>

<li className="hover:underline cursor-pointer">
Advertise Your Products
</li>

<li className="hover:underline cursor-pointer">
Amazon Pay on Merchants
</li>

</ul>

</div>


{/* column 4 */}
<div>

<h2 className="font-bold mb-3">
Let Us Help You
</h2>

<ul className="space-y-2 text-gray-300">

<li className="hover:underline cursor-pointer">
Your Account
</li>

<li className="hover:underline cursor-pointer">
Returns Centre
</li>

<li className="hover:underline cursor-pointer">
Recalls and Product Safety Alerts
</li>

<li className="hover:underline cursor-pointer">
100% Purchase Protection
</li>

<li className="hover:underline cursor-pointer">
Amazon App Download
</li>

<li className="hover:underline cursor-pointer">
Help
</li>

</ul>

</div>

</div>



{/* bottom section */}

<div className="border-t border-gray-600 py-6 flex flex-col items-center gap-4">

{/* amazon logo */}

<h1 className="text-xl font-bold">

amazon

<span className="text-orange-400">
.
</span>

</h1>


{/* language and country */}

<div className="flex gap-4">

<button className="border px-4 py-1 text-sm rounded">

🌐 English

</button>

<button className="border px-4 py-1 text-sm rounded">

🇮🇳 India

</button>

</div>

</div>

</div>

)

}

export default Footer