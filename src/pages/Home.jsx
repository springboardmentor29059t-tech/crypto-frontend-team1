// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center text-center px-6">
//       <div className="space-y-6">
//         <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">
//           Welcome to Crypto Tracker!!
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto">
//           Track your crypto assets, manage watchlists, and monitor real-time
//           market trends with a futuristic trading dashboard.
//         </p>

//         <div className="flex justify-center gap-6 mt-8">
//           <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] transition">
//             Get Started
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // "use client";
// // import { useRouter } from "next/navigation";

// // export default function Home() {
// //   const router = useRouter();

// //   return (
// //     <div className="min-h-screen flex items-center justify-center text-center px-6">
// //       <div className="space-y-6">
// //         <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
// //           Welcome to BlockfolioX
// //         </h1>

// //         <p className="text-gray-300 max-w-xl mx-auto">
// //           Track your crypto assets, manage watchlists, and monitor real-time
// //           market trends with a futuristic trading dashboard.
// //         </p>

// //         <button
// //           onClick={() => router.push("/signup")}
// //           className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition"
// //         >
// //           Get Started
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


export default function Home() {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">
        Welcome to Crypto Tracker!!
      </h1>

      <p className="mt-4 text-gray-300">
        Track your crypto assets, manage watchlists, and monitor real-time market trends.
      </p>

      <button className="mt-6 px-6 py-3 bg-purple-600 rounded-lg">
        Get Started
      </button>
    </div>
  );
}
