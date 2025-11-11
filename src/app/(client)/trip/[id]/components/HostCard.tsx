import { Avatar, Card, CardContent, Button, Chip, Typography, Divider } from "@mui/material";
import { Star, CheckCircle, MessageCircle } from "lucide-react";

interface HostCardProps {
  name: string;
  avatar?: string;
  joinedDate: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  description: string;
}

export function HostCard({
  name,
  avatar,
  joinedDate,
  verified,
  rating,
  totalReviews,
  description,
}: HostCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #ececec',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar 
              src={avatar} 
              alt={name}
              sx={{ width: 64, height: 64 }}
            >
              {name[0]}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Typography variant="h6">{name}</Typography>
                {verified && (
                  <Chip
                    icon={<CheckCircle className="h-3 w-3" />}
                    label="Verified"
                    size="small"
                    sx={{
                      bgcolor: 'success.light',
                      color: 'white',
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{rating} ({totalReviews} reviews)</span>
              </div>
            </div>
            <Button 
              variant="contained" 
              size="small" 
              startIcon={<MessageCircle className="h-4 w-4" />}
              sx={{ textTransform: 'none' }}
            >
              Message Host
            </Button>
          </div>

          <div className="space-y-2">
            <Typography color="text.secondary">{description}</Typography>
          </div>

          <Divider />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Typography variant="body2" color="text.secondary">Joined</Typography>
              <Typography>{joinedDate}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">Total trips</Typography>
              <Typography>{totalReviews}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
