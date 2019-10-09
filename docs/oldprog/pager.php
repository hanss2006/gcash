
<?php
define ( "POSTS_PER_PAGE", 10 );
class Pager {
	protected $total_rows = 0;
	protected $page = 1;
	protected $targetpage = "index.php";
	protected $paginate = "";
	protected  $current_account;
	public function __construct($total_rows, $targetpage, $page, $target_current_account) {
		$this->total_rows = $total_rows;
		$this->targetpage = $targetpage;
		$this->page = $page;
		$this->current_account = '&current_account='.$target_current_account;
	}
	
	public function gettotal_rows() 
	{
	  return $this->$total_rows;
	}
	
	public function settotal_rows($value) 
	{
	  $this->total_rows = $value;
	}
	
	public function print_pager() {
		$stages = 3;
		$start = ($this->page - 1) * POSTS_PER_PAGE;
		$prev = $this->page - 1;
		$next = $this->page + 1;
		$lastpage = ceil ( $this->total_rows / POSTS_PER_PAGE );
		$LastPagem1 = $lastpage - 1;
		
		if ($lastpage > 1) {
			
			$this->paginate .= "<div class='paginate'>";
			// Previous
			if ($this->page > 1) {
				$this->paginate .= "<a href='$this->targetpage?page=$prev$this->current_account'>предыдущая</a>";
			} else {
				$this->paginate .= "<span class='disabled'>предыдущая</span>";
			}
			
			// Pages
			if ($lastpage < 7 + ($stages * 2)) 			// Not enough pages to breaking it up
			{
				for($counter = 1; $counter <= $lastpage; $counter ++) {
					if ($counter == $this->page) {
						$this->paginate .= "<span class='current'>$counter</span>";
					} else {
						$this->paginate .= "<a href='$this->targetpage?page=$counter$this->current_account'>$counter</a>";
					}
				}
			} elseif ($lastpage > 5 + ($stages * 2)) 			// Enough pages to hide a few?
			{
				// Beginning only hide later pages
				if ($this->page < 1 + ($stages * 2)) {
					for($counter = 1; $counter < 4 + ($stages * 2); $counter ++) {
						if ($counter == $this->page) {
							$this->paginate .= "<span class='current'>$counter</span>";
						} else {
							$this->paginate .= "<a href='$this->targetpage?page=$counter$this->current_account'>$counter</a>";
						}
					}
					$this->paginate .= "...";
					$this->paginate .= "<a href='$this->targetpage?page=$LastPagem1$this->current_account'>$LastPagem1</a>";
					$this->paginate .= "<a href='$this->targetpage?page=$lastpage$this->current_account'>$lastpage</a>";
				} 				// Middle hide some front and some back
				elseif ($lastpage - ($stages * 2) > $this->page && $this->page > ($stages * 2)) {
					$this->paginate .= "<a href='$this->targetpage?page=1$this->current_account'>1</a>";
					$this->paginate .= "<a href='$this->targetpage?page=2$this->current_account'>2</a>";
					$this->paginate .= "...";
					for($counter = $this->page - $stages; $counter <= $this->page + $stages; $counter ++) {
						if ($counter == $this->page) {
							$this->paginate .= "<span class='current'>$counter</span>";
						} else {
							$this->paginate .= "<a href='$this->targetpage?page=$counter$this->current_account'>$counter</a>";
						}
					}
					$this->paginate .= "...";
					$this->paginate .= "<a href='$this->targetpage?page=$LastPagem1$this->current_account'>$LastPagem1</a>";
					$this->paginate .= "<a href='$this->targetpage?page=$lastpage$this->current_account'>$lastpage</a>";
				} 				// End only hide early pages
				else {
					$this->paginate .= "<a href='$this->targetpage?page=1$this->current_account'>1</a>";
					$this->paginate .= "<a href='$this->targetpage?page=2$this->current_account'>2</a>";
					$this->paginate .= "...";
					for($counter = $lastpage - (2 + ($stages * 2)); $counter <= $lastpage; $counter ++) {
						if ($counter == $this->page) {
							$this->paginate .= "<span class='current'>$counter</span>";
						} else {
							$this->paginate .= "<a href='$this->targetpage?page=$counter$this->current_account'>$counter</a>";
						}
					}
				}
			}
			
			// Next
			if ($this->page < $counter - 1) {
				$this->paginate .= "<a href='$this->targetpage?page=$next$this->current_account'>следующая</a>";
			} else {
				$this->paginate .= "<span class='disabled'>следующая</span>";
			}
			
			$this->paginate .= "</div>";
		}
		return $this->paginate;
	}
}
?>