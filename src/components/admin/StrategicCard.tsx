import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, 
  PieChart, Pie
} from "recharts";
import { Sparkles, BarChart2, PieChart as PieIcon, BarChart3, CircleDashed } from "lucide-react";

interface Props {
  title: string;
  insight: string;
  data: any[];
  type?: "bar" | "pie" | "vbar" | "doughnut";
  color?: string;
}

export const StrategicCard = ({ title, insight, data, type = "bar", color = "#F43F5E" }: Props) => {
  const [currentType, setCurrentType] = useState<"bar" | "pie" | "vbar" | "doughnut">(type);
  const chartColors = [color, '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F43F5E'].filter((c, i, a) => a.indexOf(c) === i);

  const renderChart = () => {
    switch (currentType) {
      case "bar":
        return (
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{fill: 'transparent'}} 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={14}>
              {data.map((_, i) => (
                <Cell key={i} fill={chartColors[i % chartColors.length]} stroke="#ffffff" strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
          </PieChart>
        );
      case "doughnut":
        return (
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
          </PieChart>
        );
      case "vbar":
        return (
          <BarChart data={data} margin={{ left: -20, right: 10, top: 10, bottom: 20 }}>
            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} interval={0} angle={-45} textAnchor="end" height={50} />
            <YAxis hide />
            <Tooltip 
              cursor={{fill: 'transparent'}} 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={16}>
              {data.map((_, i) => (
                <Cell key={i} fill={chartColors[i % chartColors.length]} stroke="#ffffff" strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  return (
    <Card className="p-6 border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-slate-800 font-semibold text-lg pr-24">{title}</h3>
          <div className="mt-2 p-3 bg-rose-50/50 rounded-2xl flex items-start gap-2 border border-rose-100/50">
            <Sparkles className="text-rose-400 mt-1 flex-shrink-0" size={14} />
            <p className="text-sm text-rose-900 leading-snug italic">{insight}</p>
          </div>
        </div>
        
        {/* Print safe selector */}
        <div className="absolute top-6 right-6 flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100 opacity-60 hover:opacity-100 transition-opacity print:hidden">
          <button 
            onClick={() => setCurrentType("bar")}
            className={`p-1.5 rounded-lg transition-colors ${currentType === 'bar' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <BarChart2 size={16} />
          </button>
          <button 
            onClick={() => setCurrentType("pie")}
            className={`p-1.5 rounded-lg transition-colors ${currentType === 'pie' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <PieIcon size={16} />
          </button>
          <button 
            onClick={() => setCurrentType("doughnut")}
            className={`p-1.5 rounded-lg transition-colors ${currentType === 'doughnut' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <CircleDashed size={16} />
          </button>
          <button 
            onClick={() => setCurrentType("vbar")}
            className={`p-1.5 rounded-lg transition-colors ${currentType === 'vbar' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            title="Barras Verticais"
          >
            <BarChart3 size={16} />
          </button>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width={currentType === "vbar" || currentType === "bar" ? "99%" : "100%"} height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};