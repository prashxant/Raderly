"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  resume: FileList;
};

export const UploadCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const file = data.resume[0];

    if (!file) {
      alert("Please upload a file");
      return;
    }

    // Only allow PDF (you said PED but assuming PDF)
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-md py-8 px-6 shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl space-y-10 items-center justify-center flex flex-col"
      >
        <Input
          type="file"
          accept=".pdf"
          {...register("resume", {
            required: "Resume is required",
          })}
        />

        {errors.resume && (
          <p className="text-red-500">{errors.resume.message}</p>
        )}

        <Button type="submit" className="px-4">
          Upload your Resume
        </Button>
      </form>
    </div>
  );
};
