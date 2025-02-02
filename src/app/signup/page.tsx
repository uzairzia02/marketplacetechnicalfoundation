"use client";

import React, { useState } from "react";
import Header from "../components/header";
import { FaHeadphones } from "react-icons/fa";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: "",
    lname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
  })

  const [error, setError] = useState("")
  const[loading, setLoading] = useState(false)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { name, lname, email, number, password, cpassword } = formValues
    if (!name || !lname || !email || !number || !password || !cpassword) {
      setError("Please fill in all fields")
      return
    }
    if (password !== cpassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
   
    const newAdminUser = {
      _type: "user",
      name: `${name} ${lname}`,
      email,
      mobile: number,
      password,
      role: "admin"
    }
    try {
      const result = await client.create(newAdminUser);
      console.log("Admin user created:", result);

      router.push("/dashboard")
    } catch (err) {
      console.error("Error creating admin user:", err);
      setError("Error creating admin user")
    } finally {
      setLoading(false)
    }
  }




  return (
    <div className="mt-28">
      <Header />
      <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6">
        <div className="text-center mb-12 sm:mb-16">
          <Link href="/">
            <div className="flex gap-2 sm:gap-3 md:gap-5 items-center justify-center">
              <FaHeadphones className="w-8 h-8 sm:w-7 sm:h-7 md:w-16 md:h-16" />
              <p className="text-sm sm:text-base md:text-4xl font-semibold italic">
                Accessories Hub
              </p>
            </div>
          </Link>
          <h4 className="text-gray-600 text-base mt-6">Create your Account</h4>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">First Name</label>
              <input
                name="name"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Last Name</label>
              <input
                name="lname"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter last name"
                value={formValues.lname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Mobile No.</label>
              <input
                name="number"
                type="number"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter mobile number"
                value={formValues.number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Confirm password"
                value={formValues.cpassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign up"}
            </button>

            <button>
              <Link href="/signin" className="text-blue-600 text-sm mt-4 block text-center">
                Already have an account? Sign in
              </Link>
            </button>


          </div>
        </form>
      </div>
    </div>
  );
}
