import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      isDefault,
    } = body;

    const { user } = await auth();

    console.log(name,phone,addressLine1,addressLine2,city,state,postalCode,isDefault)

    const userId = user.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      !name ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode
    ) {
      return NextResponse.json(
        { message: "Please fill in all required address fields" },
        { status: 400 }
      );
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // If this address is being made default,
    // remove default status from existing addresses.
    if (isDefault) {
      currentUser.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }

    currentUser.addresses.push({
      name,
      phone,
      addressLine1,
      addressLine2: addressLine2 || "",
      city,
      state,
      postalCode,
      isDefault: Boolean(isDefault),
    });

    await currentUser.save();

    const savedAddress = currentUser.addresses[currentUser.addresses.length - 1];

    return NextResponse.json(
      {
        message: "Address saved successfully",
        address: savedAddress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving address:", error);

    return NextResponse.json(
      { message: "Failed to save address" },
      { status: 500 }
    );
  }
}