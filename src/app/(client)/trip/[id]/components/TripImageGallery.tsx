import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { IconButton, Box, Dialog, DialogContent } from "@mui/material";
import Image from "next/image";

interface TripImageGalleryProps {
  images: string[];
}

export function TripImageGallery({ images }: TripImageGalleryProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);

  const nextDialogImage = () => {
    setDialogImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevDialogImage = () => {
    setDialogImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleOpenDialog = (index: number = 0) => {
    setDialogImageIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const remainingImages = images.length - 3;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8">
        <div className="lg:col-span-3 relative cursor-pointer" onClick={() => handleOpenDialog(0)} style={{ height: '500px' }}>
          <ImageWithFallback
            src={images[0]}
            alt="Main trip image"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="hidden lg:grid grid-rows-2 gap-2">
          <div className="relative cursor-pointer" onClick={() => handleOpenDialog(1)} style={{ height: '246px', width: '240px' }}>
            <ImageWithFallback
              src={images[1]}
              alt="Trip image 2"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative cursor-pointer" onClick={() => handleOpenDialog(2)} style={{ height: '246px', width: '240px' }}>
            <ImageWithFallback
              src={images[2]}
              alt="Trip image 3"
              fill
              className="object-cover rounded-lg"
            />
            {remainingImages > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span style={{ fontSize: '3rem' }}>+{remainingImages}</span>
                  <span style={{ fontSize: '1rem' }}>View all photos</span>
                </Box>
              </Box>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'transparent' }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <X className="h-6 w-6" />
          </IconButton>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
            }}
          >
            <IconButton
              onClick={prevDialogImage}
              sx={{
                position: 'absolute',
                left: 16,
                zIndex: 1,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </IconButton>
            <Box sx={{ position: 'relative', width: '100%', height: '80vh' }}>
              <Image
                src={images[dialogImageIndex]}
                alt={`Trip image ${dialogImageIndex + 1}`}
                fill
                style={{
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
                quality={100}
              />
            </Box>
            <IconButton
              onClick={nextDialogImage}
              sx={{
                position: 'absolute',
                right: 16,
                zIndex: 1,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: '9999px',
                fontSize: '0.875rem',
              }}
            >
              {dialogImageIndex + 1} / {images.length}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              overflowX: 'auto',
              mt: 2,
              pb: 2,
              px: 2,
              '&::-webkit-scrollbar': {
                height: 6,
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                onClick={() => setDialogImageIndex(index)}
                sx={{
                  position: 'relative',
                  minWidth: 80,
                  height: 60,
                  cursor: 'pointer',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: dialogImageIndex === index ? '2px solid white' : '2px solid transparent',
                  opacity: dialogImageIndex === index ? 1 : 0.6,
                  transition: 'all 0.3s',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  quality={100}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
