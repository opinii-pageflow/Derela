import React from "react";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from "recharts";
import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  insight: string;
  data: any[];
  type?: "bar" | "pie";
  color?: string;
}

export const StrategicCard = ({ title, insight, data, type = "bar", color = "#F43F5E" }: Props) => {
  const COLORS = ['#FB7185', '#F43F5E', '#E11D48', '#BE123C', '#9F1239'];

  return (
    <Card className="p-6 border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-slate-800 font-semibold text-lg">{title}</h3>
        <div className="mt-2 p-3 bg-rose-50/50 rounded-2xl flex items-start gap-2 border border-rose-100/50">
          <Sparkles className="text-rose-400 mt-1 flex-shrink-0" size={14} />
          <p className="text-sm text-rose-900 leading-snug italic">{insight}</p>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}} 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={14}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? color : `${color}40`} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};