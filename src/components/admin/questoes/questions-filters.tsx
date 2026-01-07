import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAllTopics } from "@/hooks/topics/use-all-topics";
import { Difficulty } from "@/enums/enums";

interface QuestionFiltersProps {
  difficultyFilter: Difficulty | null;
  topicsFilter: Array<number>;
  enadeFilter: boolean;
  setSearchTerm: (searchTerm: string) => void;
  setDifficultyFilter: (difficulty: Difficulty | null) => void;
  setTopicsFilter: (topicsFilter: Array<number>) => void;
  setEnadeFilter: (fromEnade: boolean) => void;
}

export function QuestionsFilters({
  difficultyFilter,
  topicsFilter,
  enadeFilter,
  setSearchTerm,
  setDifficultyFilter,
  setTopicsFilter,
  setEnadeFilter,
}: QuestionFiltersProps) {
  const { data: topics } = useAllTopics();

  function handleTopicChange(topicId: number, checked: boolean) {
    setTopicsFilter(
      checked
        ? [...topicsFilter, topicId]
        : topicsFilter.filter((id) => id !== topicId)
    );
  }

  function handleDifficutyChange(value: string) {
    if (value === "EASY") setDifficultyFilter(Difficulty.EASY);
    else if (value === "MEDIUM") setDifficultyFilter(Difficulty.MEDIUM);
    else if (value === "HARD") setDifficultyFilter(Difficulty.HARD);
    else setDifficultyFilter(null);
  }

  function clearFilters() {
    setDifficultyFilter(null);
    setTopicsFilter([]);
    setEnadeFilter(false);
  }

  return (
    <section className="p-6 md:p-4 w-full flex flex-col lg:flex-row items-end gap-4 lg:gap-8 bg-primary-green border border-green-700 rounded-lg">
      <div className="w-full grid gap-1">
        <span className="text-sm font-bold">Pesquisa</span>
        <Input
          className="placeholder:text-sm bg-white"
          type="text"
          placeholder="ID ou Enunciado"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4  md:gap-8">
        <div className="w-full lg:max-w-40 grid gap-1">
          <span className="text-sm font-bold">Dificuldade</span>
          <Select
            value={difficultyFilter?.toString() || ""}
            onValueChange={(value) => handleDifficutyChange(value)}
          >
            <SelectTrigger className="w-full lg:w-28 bg-white">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="EASY">
                  <Badge className="bg-green-600">Facil</Badge>
                </SelectItem>
                <SelectItem value="MEDIUM">
                  <Badge className="bg-yellow-600">Medio</Badge>
                </SelectItem>
                <SelectItem value="HARD">
                  <Badge className="bg-red-600">Dificil</Badge>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full lg:max-w-40 grid gap-1">
          <span className="text-sm font-bold">Topicos</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Selecionar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              {topics?.map((topic) => (
                <DropdownMenuCheckboxItem
                  key={topic.id}
                  checked={topicsFilter.includes(topic.id)}
                  onCheckedChange={(checked) =>
                    handleTopicChange(topic.id, Boolean(checked))
                  }
                >
                  {topic.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="pb-2 w-full flex items-center gap-2">
          <Checkbox
            className="border-zinc-700"
            checked={enadeFilter}
            onCheckedChange={setEnadeFilter}
          />
          <span className="font-medium text-sm whitespace-nowrap">
            Somente Questões ENADE
          </span>
        </div>
        <Button
          variant="destructive"
          className="mt-8 w-full md:w-fit cursor-pointer"
          onClick={clearFilters}
        >
          Limpar Filtros
        </Button>
      </div>
    </section>
  );
}
