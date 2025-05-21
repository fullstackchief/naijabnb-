import React, { useState } from 'react'
import { FaUpload, FaSpinner, FaTrash } from 'react-icons/fa'
import { supabase } from '../../lib/supabase'

function ImageUpload({ 
  bucket = 'images',
  folder = 'uploads',
  maxSize = 5, // MB
  maxFiles = 5,
  accept = 'image/*',
  onUpload,
  onError 
}) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])

  const handleFileChange = async (e) => {
    try {
      const selectedFiles = Array.from(e.target.files)
      
      // Validate number of files
      if (selectedFiles.length > maxFiles) {
        throw new Error(`Maximum ${maxFiles} files allowed`)
      }

      // Validate file sizes
      const oversizedFiles = selectedFiles.filter(
        file => file.size > maxSize * 1024 * 1024
      )
      if (oversizedFiles.length > 0) {
        throw new Error(`Files must be smaller than ${maxSize}MB`)
      }

      setUploading(true)
      const uploadedFiles = []

      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${folder}/${fileName}`

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file)

        if (error) throw error

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        uploadedFiles.push({
          name: file.name,
          path: filePath,
          url: publicUrl
        })
      }

      setFiles(prev => [...prev, ...uploadedFiles])
      onUpload?.(uploadedFiles)

    } catch (error) {
      onError?.(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (file) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([file.path])

      if (error) throw error

      setFiles(prev => prev.filter(f => f.path !== file.path))
    } catch (error) {
      onError?.(error.message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <FaSpinner className="w-8 h-8 text-neutral-500 animate-spin" />
            ) : (
              <>
                <FaUpload className="w-8 h-8 mb-4 text-neutral-500" />
                <p className="mb-2 text-sm text-neutral-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-neutral-500">
                  {accept.replace('image/*', 'Images')} (Max {maxSize}MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(file => (
            <div 
              key={file.path}
              className="flex items-center justify-between p-2 bg-white rounded-lg border"
            >
              <div className="flex items-center">
                <img 
                  src={file.url} 
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="ml-2 text-sm truncate">{file.name}</span>
              </div>
              <button
                onClick={() => handleRemove(file)}
                className="p-1 text-neutral-500 hover:text-error"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUpload